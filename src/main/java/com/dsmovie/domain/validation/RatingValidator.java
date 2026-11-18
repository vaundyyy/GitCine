package com.dsmovie.domain.validation;

import com.dsmovie.domain.exception.InvalidRatingException;
import com.dsmovie.domain.model.Rating;

public final class RatingValidator {
    private RatingValidator() {}

    public static void validate(double value) {
        if (value < Rating.MIN_VALUE || value > Rating.MAX_VALUE) {
            throw new InvalidRatingException("Rating must be between 1 and 5");
        }
    }
}
