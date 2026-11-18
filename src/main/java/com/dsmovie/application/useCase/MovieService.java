package com.dsmovie.application.useCase;

import com.dsmovie.application.dto.movie.MovieListResponse;
import com.dsmovie.application.dto.movie.MovieResponse;
import com.dsmovie.application.port.in.GetMovieUseCase;
import com.dsmovie.application.port.out.MovieRepositoryPort;
import com.dsmovie.domain.exception.DadosInvalidosException;
import com.dsmovie.domain.exception.MovieNotFoundException;
import com.dsmovie.domain.model.Movie;
import org.springframework.stereotype.Service;

@Service
public class MovieService implements GetMovieUseCase {
    private final MovieRepositoryPort repository;

    public MovieService(MovieRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public MovieListResponse findAll(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new DadosInvalidosException("Invalid pagination parameters");
        }
        var movies = repository.findAll(page, size).stream().map(this::toResponse).toList();
        long total = repository.count();
        int totalPages = (int) Math.ceil((double) total / size);
        return new MovieListResponse(movies, page, size, total, totalPages);
    }

    @Override
    public MovieResponse findById(Long id) {
        Movie movie = repository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found: " + id));
        return toResponse(movie);
    }

    private MovieResponse toResponse(Movie movie) {
        return new MovieResponse(movie.getId(), movie.getTitle(), movie.getSynopsis(),
                movie.getImage(), movie.getScore(), movie.getCount());
    }
}
