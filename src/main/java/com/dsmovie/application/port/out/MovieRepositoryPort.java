package com.dsmovie.application.port.out;

import com.dsmovie.domain.model.Movie;
import java.util.List;
import java.util.Optional;

public interface MovieRepositoryPort {
    Optional<Movie> findById(Long id);
    List<Movie> findAll(int page, int size);
    long count();
    Movie save(Movie movie);
}
