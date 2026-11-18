package com.dsmovie.infrastructure.persistence.adapter;

import com.dsmovie.application.port.out.MovieRepositoryPort;
import com.dsmovie.domain.model.Movie;
import com.dsmovie.infrastructure.persistence.entity.MovieEntity;
import com.dsmovie.infrastructure.persistence.repository.MovieJpaRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MoviePersistenceAdapter implements MovieRepositoryPort {
    private final MovieJpaRepository repository;

    public MoviePersistenceAdapter(MovieJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Movie> findById(Long id) {
        return repository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Movie> findAll(int page, int size) {
        return repository.findAll(PageRequest.of(page, size)).getContent().stream()
                .map(this::toDomain).toList();
    }

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    public Movie save(Movie movie) {
        return toDomain(repository.save(toEntity(movie)));
    }

    private Movie toDomain(MovieEntity entity) {
        return new Movie(entity.getId(), entity.getTitle(), entity.getSynopsis(),
                entity.getImage(), entity.getScore(), entity.getCount());
    }

    private MovieEntity toEntity(Movie movie) {
        MovieEntity entity = new MovieEntity();
        entity.setId(movie.getId());
        entity.setTitle(movie.getTitle());
        entity.setSynopsis(movie.getSynopsis());
        entity.setImage(movie.getImage());
        entity.setScore(movie.getScore());
        entity.setCount(movie.getCount());
        return entity;
    }
}
