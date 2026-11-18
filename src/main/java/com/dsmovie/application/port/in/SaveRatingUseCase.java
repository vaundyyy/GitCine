package com.dsmovie.application.port.in;

import com.dsmovie.application.dto.rating.RatingRequest;
import com.dsmovie.application.dto.rating.RatingResponse;

public interface SaveRatingUseCase {
    RatingResponse save(Long authenticatedUserId, RatingRequest request);
}
