package com.exadel.team3.backend.dao;

import java.util.List;

import com.exadel.team3.backend.dao.projections.RatingProjection;

public interface AssignableRepositoryAggregation {
    List<RatingProjection> collectRatingBySum(int limit);
    List<RatingProjection> collectRatingByAverage(int limit);
}
