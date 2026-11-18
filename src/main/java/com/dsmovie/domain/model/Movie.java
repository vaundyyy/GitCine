package com.dsmovie.domain.model;

import com.dsmovie.domain.exception.DadosInvalidosException;

public class Movie {
    private Long id;
    private String title;
    private String synopsis;
    private String image;
    private double score;
    private int count;

    public Movie() {}

    public Movie(Long id, String title, String synopsis, String image, double score, int count) {
        this.id = id;
        this.title = title;
        this.synopsis = synopsis;
        this.image = image;
        this.score = score;
        this.count = count;
    }

    public void validate() {
        if (title == null || title.isBlank()) {
            throw new DadosInvalidosException("Title is required");
        }
        if (score < 0.0 || count < 0) {
            throw new DadosInvalidosException("Movie score and count cannot be negative");
        }
    }

    public void updateRating(double average, int totalRatings) {
        if (average < 0.0 || average > 5.0 || totalRatings < 0) {
            throw new DadosInvalidosException("Invalid movie rating totals");
        }
        this.score = average;
        this.count = totalRatings;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSynopsis() { return synopsis; }
    public void setSynopsis(String synopsis) { this.synopsis = synopsis; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }
    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }
}
