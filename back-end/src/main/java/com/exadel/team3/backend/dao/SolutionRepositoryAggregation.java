package com.exadel.team3.backend.dao;

import java.util.List;

import org.bson.types.ObjectId;

import com.exadel.team3.backend.dao.projections.RatingProjection;

public interface SolutionRepositoryAggregation {
    List<RatingProjection> collectRatingBySum(ObjectId taskId, int limit);
    List<RatingProjection> collectRatingByAverage(ObjectId taskId, int limit);
}
