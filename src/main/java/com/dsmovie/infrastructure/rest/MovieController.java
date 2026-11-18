package com.dsmovie.infrastructure.rest;

import com.dsmovie.application.dto.movie.MovieListResponse;
import com.dsmovie.application.dto.movie.MovieResponse;
import com.dsmovie.application.port.in.GetMovieUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    private final GetMovieUseCase useCase;

    public MovieController(GetMovieUseCase useCase) {
        this.useCase = useCase;
    }

    @GetMapping
    public ResponseEntity<MovieListResponse> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(useCase.findAll(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(useCase.findById(id));
    }
}
