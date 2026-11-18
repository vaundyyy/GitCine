package com.dsmovie.application.dto.movie;

public record MovieResponse(
        Long id,
        String title,
        String synopsis,
        String image,
        double score,
        int count
) {}
