package com.exadel.team3.backend.dao;

import java.util.List;

import org.bson.types.ObjectId;

import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.dao.projections.TestItemProjection;

public interface TestRepositoryAggregation {
    List<TestItemProjection> findNeedingManualCheck(String assignedById);
    List<RatingProjection> collectRatingBySum(ObjectId topicId, int limit);
    List<RatingProjection> collectRatingByAverage(ObjectId topicId, int limit);
}
