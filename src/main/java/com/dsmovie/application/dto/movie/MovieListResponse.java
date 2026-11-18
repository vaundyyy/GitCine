package com.dsmovie.application.dto.movie;

import java.util.List;

public record MovieListResponse(
        List<MovieResponse> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {}
