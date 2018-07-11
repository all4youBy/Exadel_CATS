package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Topic;

import java.util.List;

public interface TopicRepositoryAggregation {
    List<Topic> getTopicTree();
    List<Topic> getTopicTree(String rootId);
}
