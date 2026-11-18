package com.dsmovie.application.port.in;

import com.dsmovie.application.dto.movie.MovieListResponse;
import com.dsmovie.application.dto.movie.MovieResponse;

public interface GetMovieUseCase {
    MovieListResponse findAll(int page, int size);
    MovieResponse findById(Long id);
}
