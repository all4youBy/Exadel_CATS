package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Topic;
import org.bson.types.ObjectId;

import java.util.List;

public interface TopicRepositoryAggregation {
    List<Topic> getTopicTree();
    List<Topic> getTopicTree(ObjectId rootId);
}
