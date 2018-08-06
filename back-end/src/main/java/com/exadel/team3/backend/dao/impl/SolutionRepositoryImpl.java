package com.exadel.team3.backend.dao.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;
import static org.springframework.data.mongodb.core.aggregation.LookupOperation.newLookup;

import com.exadel.team3.backend.dao.projections.AssignableProjection;
import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.dao.SolutionRepositoryAggregation;
import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.entities.Solution;

@Repository
public class SolutionRepositoryImpl
        extends AssignableRepositoryImpl<Solution>
        implements AssignableRepositoryAggregation, SolutionRepositoryAggregation {

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
                        project("_id", "start", "deadline", "task.text", "task.topicIds"),
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
                                .addToSet("topic").as("topics"),
                        sort(Sort.Direction.DESC, "start")
                ),
                "solutions",
                AssignableProjection.class
        ).getMappedResults();
    }
}
