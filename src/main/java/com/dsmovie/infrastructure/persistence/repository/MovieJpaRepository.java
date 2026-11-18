package com.dsmovie.infrastructure.persistence.repository;

import com.dsmovie.infrastructure.persistence.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieJpaRepository extends JpaRepository<MovieEntity, Long> {}
