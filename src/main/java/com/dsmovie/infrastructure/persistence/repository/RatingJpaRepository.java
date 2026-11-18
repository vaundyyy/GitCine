package com.dsmovie.infrastructure.persistence.repository;

import com.dsmovie.infrastructure.persistence.entity.RatingEntity;
import com.dsmovie.infrastructure.persistence.entity.RatingIdEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingJpaRepository extends JpaRepository<RatingEntity, RatingIdEntity> {
    @Query("select r.value from RatingEntity r where r.id.movieId = :movieId")
    List<Double> findValuesByMovieId(@Param("movieId") Long movieId);
}
