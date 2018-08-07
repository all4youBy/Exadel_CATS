package com.exadel.team3.backend.dao.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.entities.Assignable;
import com.exadel.team3.backend.dao.ActivityQueries;

@Repository
public abstract class AssignableRepositoryImpl<T extends Assignable>
        implements AssignableRepositoryAggregation, ActivityQueries {

    @Autowired
    MongoTemplate mongoTemplate;

    protected abstract Class<T> getEntityClass();

    @Override
    public List<RatingProjection> collectRatingBySum(int limit) {
        return collectRating(
                getMatchOperation(),
                getBySumGroupingOperation(),
                limit
        );
    }

    @Override
    public List<RatingProjection> collectRatingByAverage(int limit) {
        return collectRating(
                getMatchOperation(),
                getByAverageGroupingOperation(),
                limit
        );
    }


    MatchOperation getMatchOperation() {
        return match(Criteria.where("mark").ne(null).and("deadline").lte(LocalDateTime.now()));
    }
    GroupOperation getBySumGroupingOperation() {
        return group("assignedTo")
                .sum("mark")
                .as("rating");
    }
    GroupOperation getByAverageGroupingOperation() {
        return group("assignedTo")
                .avg("mark")
                .as("rating");
    }

    List<RatingProjection> collectRating(
            @NonNull MatchOperation matchOperation,
            @NonNull GroupOperation groupingOperation,
            int limit
    ) {
        AggregationResults<RatingProjection> results =
            mongoTemplate.aggregate(
                TypedAggregation.newAggregation(
                        matchOperation,
                        groupingOperation,
                        LookupOperation.newLookup()
                                .from("users")
                                .localField("_id")
                                .foreignField("_id")
                                .as("user"),
                        Aggregation.project("user._id", "user.firstName", "user.lastName", "rating"),
                        Aggregation.sort(Sort.Direction.DESC, "rating"),
                        Aggregation.limit(limit > 0 ? limit : 1)
                ),
                getEntityClass().getSimpleName().toLowerCase() + "s",
                RatingProjection.class
            );
        return results.getMappedResults();
    }


}
