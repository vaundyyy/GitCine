package com.dsmovie.application.dto.rating;

public record RatingResponse(
        Long movieId,
        Long userId,
        double value,
        double movieScore,
        int movieCount
) {}
