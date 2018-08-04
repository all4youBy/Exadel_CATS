package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.dao.projections.RatingProjection;

import java.util.List;

public interface AssignableRepositoryAggregation {
    List<RatingProjection> collectRatingBySum(int limit);
    List<RatingProjection> collectRatingByAverage(int limit);
}
