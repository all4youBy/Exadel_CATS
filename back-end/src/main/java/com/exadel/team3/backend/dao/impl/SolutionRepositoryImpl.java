package com.exadel.team3.backend.dao.impl;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.bson.types.ObjectId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;
import static org.springframework.data.mongodb.core.aggregation.LookupOperation.newLookup;

import com.exadel.team3.backend.dao.projections.ActivityProjection;
import com.exadel.team3.backend.dao.projections.AssignableProjection;
import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.dao.SolutionRepositoryAggregation;
import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.entities.Solution;
import org.springframework.util.CollectionUtils;

@Repository
public class SolutionRepositoryImpl
        extends AssignableRepositoryImpl<Solution>
        implements  AssignableRepositoryAggregation,
                    SolutionRepositoryAggregation {

    @Autowired
    private MongoTemplate mongoTemplate;

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

    @Override
    public List<AssignableProjection> findByAssignedToWithTopics(String assignedTo) {
        return  mongoTemplate.aggregate(
                newAggregation(
                        match(Criteria.where("assignedTo").is(assignedTo)),
                        newLookup()
                                .from("tasks")
                                .localField("taskId")
                                .foreignField("_id")
                                .as("task"),
                        project("_id", "start", "deadline", "task.text", "task.topicIds", "mark"),
                        unwind("topicIds", true),
                        unwind("topicIds", true),
                        newLookup()
                                .from("topics")
                                .localField("topicIds")
                                .foreignField("_id")
                                .as("topic"),
                        unwind("topic", true),
                        group("_id")
                                .first("text").as("text")
                                .first("start").as("start")
                                .first("deadline").as("deadline")
                                .first("mark").as("mark")
                                .addToSet("topic").as("topics"),
                        sort(Sort.Direction.DESC, "deadline", "start")
                ),
                "solutions",
                AssignableProjection.class
        ).getMappedResults();
    }

    @Override
    public List<ActivityProjection> findRecentActivities(@NonNull LocalDateTime after, @NonNull LocalDateTime now) {
        return findRecentActivities(after, now, null);
    }

    @Override
    public List<ActivityProjection> findRecentActivities(
            @NonNull LocalDateTime after,
            @NonNull LocalDateTime now,
            Collection<String> matchingGroups) {

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
                        !CollectionUtils.isEmpty(matchingGroups)
                                ? match(Criteria.where("user.groups").in(matchingGroups).and("user.role").is("STUDENT"))
                                : match(Criteria.where("user._id").exists(true)),
                        newLookup()
                                .from("tasks")
                                .localField("taskId")
                                .foreignField("_id")
                                .as("task"),
                        project("user._id",
                                "user.firstName",
                                "user.lastName",
                                "assignedBy",
                                "task.text",
                                "start",
                                "deadline",
                                "mark"
                        )
                ),
                getEntityClass().getSimpleName().toLowerCase() + "s",
                ActivityProjection.class
        ).getMappedResults();
    }
}
