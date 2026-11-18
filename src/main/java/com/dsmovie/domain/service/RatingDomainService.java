package com.dsmovie.domain.service;

import com.dsmovie.domain.model.Rating;
import com.dsmovie.domain.model.RatingId;

public class RatingDomainService {
    public Rating createOrUpdate(Rating existing, Long movieId, Long userId, double value) {
        RatingId id = new RatingId(movieId, userId);
        Rating rating = existing == null ? new Rating(id, value) : existing;
        rating.setId(id);
        rating.setValue(value);
        rating.validate();
        return rating;
    }
}
