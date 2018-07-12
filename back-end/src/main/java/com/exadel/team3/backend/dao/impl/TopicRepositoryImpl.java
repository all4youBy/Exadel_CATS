package com.exadel.team3.backend.dao.impl;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.GraphLookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;

import com.exadel.team3.backend.dao.TopicRepositoryAggregation;
import com.exadel.team3.backend.entities.Topic;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.util.StringUtils;

import java.util.List;

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

        MatchOperation match = null;
        if (!StringUtils.isEmpty(rootId)) {
            match = new MatchOperation(
                    new Criteria().orOperator(
                            Criteria.where("id").is(rootId),
                            Criteria.where("parentHierarchy.id").is(rootId)
                    )
            );
        }

        TypedAggregation<Topic> aggregation =
                match != null
                  ? TypedAggregation.newAggregation(Topic.class, graphLookupOperation, match)
                  : TypedAggregation.newAggregation(Topic.class, graphLookupOperation);

        return mongoTemplate.aggregate(aggregation, "topics", Topic.class)
                .getMappedResults();
    }

}
