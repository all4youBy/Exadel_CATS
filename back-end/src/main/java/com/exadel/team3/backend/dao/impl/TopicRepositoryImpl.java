package com.exadel.team3.backend.dao.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.GraphLookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.exadel.team3.backend.dao.TopicRepositoryAggregation;
import com.exadel.team3.backend.entities.Topic;

@Repository
public class TopicRepositoryImpl implements TopicRepositoryAggregation {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Topic> getTopicTree() {
        return getTopicTree(null);
    }

    @Override
    public List<Topic> getTopicTree(ObjectId rootId) {
        GraphLookupOperation graphLookupOperation = GraphLookupOperation.builder()
                .from("topics")
                .startWith("parentId")
                .connectFrom("parentId")
                .connectTo("_id")
                .as("parentHierarchy");

        MatchOperation matchOperation = null;
        if (!StringUtils.isEmpty(rootId)) {
            matchOperation = new MatchOperation(
                    new Criteria().orOperator(
                            Criteria.where("id").is(rootId),
                            Criteria.where("parentHierarchy.id").is(rootId)
                    )
            );
        }

        TypedAggregation<Topic> aggregation =
                matchOperation != null
                  ? TypedAggregation.newAggregation(Topic.class, graphLookupOperation, matchOperation)
                  : TypedAggregation.newAggregation(Topic.class, graphLookupOperation);

        return mongoTemplate.aggregate(aggregation, "topics", Topic.class)
                .getMappedResults();
    }

}
