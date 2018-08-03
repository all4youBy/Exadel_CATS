package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.dao.impl.RatingProjectionImpl;

import java.util.List;

public interface AssignableRepositoryAggregation {
    List<RatingProjectionImpl> collectRatingBySum(int limit);
    List<RatingProjectionImpl> collectRatingByAverage(int limit);
}
