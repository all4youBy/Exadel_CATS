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
import static org.springframework.data.mongodb.core.aggregation.LookupOperation.newLookup;


import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.entities.Assignable;
import com.exadel.team3.backend.dao.ActivityQueries;
import com.exadel.team3.backend.dao.projections.ActivityProjection;

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

    @Override
    public List<ActivityProjection> findRecentActivities(@NonNull LocalDateTime after, @NonNull LocalDateTime now) {
        return mongoTemplate.aggregate(
                TypedAggregation.newAggregation(
                    match(
                            new Criteria().orOperator(
                                    Criteria.where("start").gt(after),
                                    new Criteria().andOperator(
                                            Criteria.where("deadline").gt(after),
                                            Criteria.where("deadline").lt(now)
                                    )
                            )
                    ),
                    newLookup()
                            .from("users")
                            .localField("assignedTo")
                            .foreignField("_id")
                            .as("user"),
                    project("user._id",
                            "user.firstName",
                            "user.lastName",
                            "start",
                            "deadline"
                    )
                ),
                getEntityClass().getSimpleName().toLowerCase() + "s",
                ActivityProjection.class
        ).getMappedResults();
    }


    MatchOperation getMatchOperation() {
        return match(Criteria.where("mark").ne(null));
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
