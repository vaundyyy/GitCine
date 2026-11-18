package com.dsmovie.infrastructure.rest;

import com.dsmovie.application.dto.rating.RatingRequest;
import com.dsmovie.application.dto.rating.RatingResponse;
import com.dsmovie.application.port.in.SaveRatingUseCase;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {
    private final SaveRatingUseCase useCase;

    public RatingController(SaveRatingUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<RatingResponse> save(
            @AuthenticationPrincipal Long userId,
            @Valid @RequestBody RatingRequest request) {
        return ResponseEntity.ok(useCase.save(userId, request));
    }
}
