package com.exadel.team3.backend.dao.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.dao.TestRepositoryAggregation;

@Repository
public class TestRepositoryImpl
        extends AssignableRepositoryImpl<Test>
        implements AssignableRepositoryAggregation, TestRepositoryAggregation {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    protected Class getEntityClass() {
        return Test.class;
    }

    @Override
    public List<TestItemProjection> findNeedingManualCheck(String assignedById) {
        LookupOperation lookupOperation =
                LookupOperation.newLookup()
                    .from("questions")
                    .localField("items.questionId")
                    .foreignField("_id")
                    .as("question");

        return mongoTemplate.aggregate(
                TypedAggregation.newAggregation(
                    Aggregation.match(Criteria.where("deadline").lte(LocalDateTime.now())),
                    Aggregation.unwind("items"),
                    lookupOperation,
                    Aggregation.project("items.questionId", "question.text", "items.answer", "items.status"),
                    Aggregation.match(Criteria.where("status").is("UNCHECKED"))
                ),
                "tests",
                TestItemProjection.class
        ).getMappedResults();
    }
}
