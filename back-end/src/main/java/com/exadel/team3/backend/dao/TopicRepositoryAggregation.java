package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;

import java.util.List;

import com.exadel.team3.backend.entities.Topic;

public interface TopicRepositoryAggregation {
    List<Topic> getTopicTree();
    List<Topic> getTopicTree(ObjectId rootId);
}
