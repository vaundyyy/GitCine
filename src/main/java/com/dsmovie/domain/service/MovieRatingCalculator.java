package com.dsmovie.domain.service;

import java.util.List;

public class MovieRatingCalculator {
    public double average(List<Double> values) {
        if (values == null || values.isEmpty()) return 0.0;
        double sum = 0.0;
        for (Double value : values) sum += value;
        return sum / values.size();
    }
}
