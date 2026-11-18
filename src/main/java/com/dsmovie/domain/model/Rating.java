package com.dsmovie.domain.model;

import com.dsmovie.domain.exception.InvalidRatingException;

public class Rating {
    public static final double MIN_VALUE = 1.0;
    public static final double MAX_VALUE = 5.0;

    private RatingId id;
    private double value;

    public Rating() {}

    public Rating(RatingId id, double value) {
        this.id = id;
        this.value = value;
    }

    public void validate() {
        if (id == null || id.getMovieId() == null || id.getUserId() == null) {
            throw new InvalidRatingException("Movie and user are required");
        }
        if (value < MIN_VALUE || value > MAX_VALUE) {
            throw new InvalidRatingException("Rating must be between 1 and 5");
        }
    }

    public RatingId getId() { return id; }
    public void setId(RatingId id) { this.id = id; }
    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }
}
