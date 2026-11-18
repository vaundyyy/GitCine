package com.dsmovie.application.dto.rating;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record RatingRequest(
        @NotNull(message = "Movie id is required")
        Long movieId,

        @NotNull(message = "Rating value is required")
        @DecimalMin(value = "1.0", message = "Rating must be between 1 and 5")
        @DecimalMax(value = "5.0", message = "Rating must be between 1 and 5")
        Double value
) {}
