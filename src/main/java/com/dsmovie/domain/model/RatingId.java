package com.dsmovie.domain.model;

import java.util.Objects;

public class RatingId {
    private Long movieId;
    private Long userId;

    public RatingId() {}

    public RatingId(Long movieId, Long userId) {
        this.movieId = movieId;
        this.userId = userId;
    }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RatingId that)) return false;
        return Objects.equals(movieId, that.movieId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(movieId, userId);
    }
}
