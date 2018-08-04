package com.exadel.team3.backend.dao.impl;

import java.util.List;

import com.exadel.team3.backend.dao.projections.RatingProjection;
import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
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

    private List<RatingProjection> collectRating(int limit, boolean byAverage) {
        AggregationOperation groupingOperation;
        if (byAverage) {
            groupingOperation = Aggregation
                    .group("assignedTo")
                    .avg("mark")
                    .as("rating");
        } else {
            groupingOperation = Aggregation
                    .group("assignedTo")
                    .sum("mark")
                    .as("rating");
        }

        AggregationOperation lookupOperation =
                LookupOperation.newLookup()
                        .from("users")
                        .localField("_id")
                        .foreignField("_id")
                        .as("user");


        AggregationOperation projectionOperation =
                Aggregation.project("user._id", "user.firstName", "user.lastName", "rating");

        return mongoTemplate.aggregate(
                TypedAggregation.newAggregation(
                        Aggregation.match(Criteria.where("mark").ne(null)),
                        groupingOperation,
                        lookupOperation,
                        projectionOperation,
                        Aggregation.sort(Sort.Direction.DESC, "rating"),
                        Aggregation.limit(limit > 0 ? limit : 1)
                ),
                getEntityClass().getSimpleName().toLowerCase() + "s",
                RatingProjection.class
        ).getMappedResults();
    }

    @Override
    public List<RatingProjection> collectRatingBySum(int limit) {
        return collectRating(limit, false);
    }

    @Override
    public List<RatingProjection> collectRatingByAverage(int limit) {
        return collectRating(limit, true);
    }
}
