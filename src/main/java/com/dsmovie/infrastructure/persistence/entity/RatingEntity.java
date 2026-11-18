package com.dsmovie.infrastructure.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_rating")
public class RatingEntity {
    @EmbeddedId
    private RatingIdEntity id;

    @Column(nullable = false)
    private double value;

    public RatingIdEntity getId() { return id; }
    public void setId(RatingIdEntity id) { this.id = id; }
    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }
}
