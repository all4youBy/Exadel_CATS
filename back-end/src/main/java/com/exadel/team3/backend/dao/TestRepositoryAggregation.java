package com.exadel.team3.backend.dao;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.dao.projections.QuestionAssessmentProjection;
import org.bson.types.ObjectId;

import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.dao.projections.TestItemProjection;

public interface TestRepositoryAggregation {
    List<TestItemProjection> findNeedingManualCheck(String assignedById);

    List<RatingProjection> collectRatingBySum(List<ObjectId> topicIds, int limit);
    List<RatingProjection> collectRatingByAverage(List<ObjectId> topicIds, int limit);

    List<ObjectId> findLastUsedQuestionIds(LocalDateTime since);
    List<QuestionAssessmentProjection> findQuestionUsage(Collection<ObjectId> questionIds);
}
