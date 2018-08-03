package com.exadel.team3.backend.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;

import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.entities.Assignable;

@Repository
public abstract class AssignableRepositoryImpl<T extends Assignable>
        implements AssignableRepositoryAggregation {

    @Autowired
    MongoTemplate mongoTemplate;

    protected abstract Class<T> getEntityClass();

    private List<RatingProjectionImpl> collectRating(int limit, boolean byAverage) {
        AggregationOperation groupingOperation =
                byAverage
                ? Aggregation.group("assignedTo").avg("mark").as("rating")
                : Aggregation.group("assignedTo").sum("mark").as("rating");
        TypedAggregation<T> aggregation = TypedAggregation.newAggregation(
                getEntityClass(),
                Aggregation.match(Criteria.where("mark").ne(null)),
                groupingOperation,
                Aggregation.project("rating"),
                Aggregation.limit(limit > 0 ? limit : 1)
        );
        return mongoTemplate.aggregate(
                aggregation,
                RatingProjectionImpl.class
        ).getMappedResults();
    }

    @Override
    public List<RatingProjectionImpl> collectRatingBySum(int limit) {
        return collectRating(limit, false);
    }

    @Override
    public List<RatingProjectionImpl> collectRatingByAverage(int limit) {
        return collectRating(limit, true);
    }
}
