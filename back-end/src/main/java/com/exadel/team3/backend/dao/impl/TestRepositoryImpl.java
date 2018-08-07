package com.exadel.team3.backend.dao.impl;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.aggregation.LookupOperation.*;

import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.dao.projections.TestItemProjection;
import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.dao.TestRepositoryAggregation;
import com.exadel.team3.backend.dao.projections.AssignableProjection;
import com.exadel.team3.backend.dao.projections.ActivityProjection;

@Repository
public class TestRepositoryImpl
        extends     AssignableRepositoryImpl<Test>
        implements  AssignableRepositoryAggregation,
                    TestRepositoryAggregation {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    protected Class<Test> getEntityClass() {
        return Test.class;
    }


    @Override
    public List<AssignableProjection> findByAssignedToWithTopics(@NonNull String assignedTo) {
        return mongoTemplate.aggregate(
            newAggregation(
                match(Criteria.where("assignedTo").is(assignedTo)),
                unwind("items"),
                newLookup()
                        .from("questions")
                        .localField("items.questionId")
                        .foreignField("_id")
                        .as("question"),
                project("_id", "title", "start", "deadline", "question.topicIds", "mark"),
                unwind("topicIds", true),
                unwind("topicIds", true),
                newLookup()
                        .from("topics")
                        .localField("topicIds")
                        .foreignField("_id")
                        .as("topic"),
                unwind("topic", true),
                group("_id")
                        .first("title").as("text")
                        .first("start").as("start")
                        .first("deadline").as("deadline")
                        .first("mark").as("mark")
                        .addToSet("topic").as("topics"),
                sort(Sort.Direction.DESC, "deadline", "start")
            ),
            "tests",
            AssignableProjection.class
        ).getMappedResults();
    }

    @Override
    public List<TestItemProjection> findNeedingManualCheck(String assignedById) {
        return mongoTemplate.aggregate(
                newAggregation(
                    match(Criteria.where("deadline").lte(LocalDateTime.now())),
                    unwind("items"),
                    newLookup()
                            .from("questions")
                            .localField("items.questionId")
                            .foreignField("_id")
                            .as("question"),
                    project("items.questionId", "question.text", "items.answer", "items.status"),
                    match(Criteria.where("status").is("UNCHECKED"))
                ),
                "tests",
                TestItemProjection.class
        ).getMappedResults();
    }


    @Override
    public List<RatingProjection> collectRatingBySum(@NonNull List<ObjectId> topicIds, int limit) {
        return collectRating(getBySumGroupingOperation(), topicIds, limit);
    }

    @Override
    public List<RatingProjection> collectRatingByAverage(@NonNull List<ObjectId> topicIds, int limit) {
        return collectRating(getByAverageGroupingOperation(), topicIds, limit);
    }

    private List<RatingProjection> collectRating(GroupOperation groupingOperation, List<ObjectId> topicIds, int limit) {
        AggregationResults<RatingProjection> results =
                mongoTemplate.aggregate(
                        newAggregation(
                                getMatchOperation(),
                                unwind("items"),
                                newLookup()
                                        .from("questions")
                                        .localField("items.questionId")
                                        .foreignField("_id")
                                        .as("question"),
                                project("_id", "assignedTo", "question.topicIds", "mark"),
                                unwind("topicIds"),
//                                unwind("topicIds"),
                                match(Criteria.where("topicIds").in(topicIds)),
                                group("_id")
                                        .first("assignedTo").as("assignedTo")
                                        .first("mark").as("mark"),
                                groupingOperation,
                                newLookup()
                                        .from("users")
                                        .localField("_id")
                                        .foreignField("_id")
                                        .as("user"),
                                project("user._id", "user.firstName", "user.lastName", "rating"),
                                sort(Sort.Direction.DESC, "rating"),
                                limit(limit > 0 ? limit : 1)
                        ),
                        "tests",
                        RatingProjection.class
                );
        return results.getMappedResults();
    }

    @Override
    public List<ActivityProjection> findRecentActivities(
            @NonNull LocalDateTime after,
            @NonNull LocalDateTime now) {
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
                        project("user._id",
                                "user.firstName",
                                "user.lastName",
                                "assignedBy",
                                "title",
                                "start",
                                "deadline"
                        )
                ),
                getEntityClass().getSimpleName().toLowerCase() + "s",
                ActivityProjection.class
        ).getMappedResults();    }
}
