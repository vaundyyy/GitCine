package com.dsmovie.application.useCase;

import com.dsmovie.application.dto.rating.RatingRequest;
import com.dsmovie.application.dto.rating.RatingResponse;
import com.dsmovie.application.port.in.SaveRatingUseCase;
import com.dsmovie.application.port.out.MovieRepositoryPort;
import com.dsmovie.application.port.out.RatingRepositoryPort;
import com.dsmovie.application.port.out.UserRepositoryPort;
import com.dsmovie.domain.exception.MovieNotFoundException;
import com.dsmovie.domain.exception.UserNotFoundException;
import com.dsmovie.domain.model.Movie;
import com.dsmovie.domain.model.Rating;
import com.dsmovie.domain.service.MovieRatingCalculator;
import com.dsmovie.domain.service.RatingDomainService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RatingService implements SaveRatingUseCase {
    private final MovieRepositoryPort movieRepository;
    private final RatingRepositoryPort ratingRepository;
    private final UserRepositoryPort userRepository;
    private final RatingDomainService ratingDomainService;
    private final MovieRatingCalculator calculator;

    public RatingService(MovieRepositoryPort movieRepository,
                         RatingRepositoryPort ratingRepository,
                         UserRepositoryPort userRepository) {
        this.movieRepository = movieRepository;
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
        this.ratingDomainService = new RatingDomainService();
        this.calculator = new MovieRatingCalculator();
    }

    @Override
    @Transactional
    public RatingResponse save(Long authenticatedUserId, RatingRequest request) {
        if (authenticatedUserId == null) {
            throw new UserNotFoundException("Authenticated user is required");
        }

        userRepository.findById(authenticatedUserId)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        Movie movie = movieRepository.findById(request.movieId())
                .orElseThrow(() -> new MovieNotFoundException("Movie not found: " + request.movieId()));

        Rating existing = ratingRepository.findByUserAndMovie(authenticatedUserId, request.movieId()).orElse(null);
        Rating rating = ratingDomainService.createOrUpdate(existing, request.movieId(), authenticatedUserId, request.value());
        ratingRepository.save(rating);

        List<Double> values = ratingRepository.findValuesByMovieId(request.movieId());
        double average = Math.round(calculator.average(values) * 100.0) / 100.0;
        movie.updateRating(average, values.size());
        Movie updated = movieRepository.save(movie);

        return new RatingResponse(request.movieId(), authenticatedUserId, rating.getValue(),
                updated.getScore(), updated.getCount());
    }
}
