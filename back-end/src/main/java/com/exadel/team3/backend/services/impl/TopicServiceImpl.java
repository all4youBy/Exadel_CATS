package com.exadel.team3.backend.services.impl;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.TopicRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.TopicService;

import java.util.List;

@Service
public class TopicServiceImpl
    extends CrudServiceImpl<Topic, ObjectId>
    implements TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Override
    protected MongoRepository<Topic, ObjectId> getRepository() {
        return topicRepository;
    }

    @Override
    public List<Topic> getItems() {
        return topicRepository.getTopicTree();
    }

    @Override
    public List<Topic> getTopics(ObjectId rootId) {
        return topicRepository.getTopicTree(rootId);
    }
}
