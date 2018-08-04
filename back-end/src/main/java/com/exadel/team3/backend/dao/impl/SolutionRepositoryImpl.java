package com.exadel.team3.backend.dao.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.dao.SolutionRepositoryAggregation;
import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.entities.Solution;

@Repository
public class SolutionRepositoryImpl
        extends AssignableRepositoryImpl<Solution>
        implements AssignableRepositoryAggregation, SolutionRepositoryAggregation {

    @Override
    protected Class<Solution> getEntityClass() {
        return Solution.class;
    }

    @Override
    public List<RatingProjection> collectRatingBySum(@NonNull ObjectId taskId, int limit) {
        return collectRating(
                Aggregation.match(Criteria.where("mark").ne(null).and("taskId").is(taskId)),
                getBySumGroupingOperation(),
                limit
        );
    }

    @Override
    public List<RatingProjection> collectRatingByAverage(ObjectId taskId, int limit) {
        return collectRating(
                Aggregation.match(Criteria.where("mark").ne(null).and("taskId").is(taskId)),
                getByAverageGroupingOperation(),
                limit
        );
    }
}
