package com.exadel.team3.backend.services.impl;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.TopicRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.TopicService;

import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {
    @Autowired
    private TopicRepository topicRepository;

    @Override
    public Topic addTopic(@NonNull Topic topic) {
        return topicRepository.insert(topic);
    }

    @Override
    public Topic updateTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    @Override
    public List<Topic> getTopics(@NonNull ObjectId rootId) {
        return topicRepository.getTopicTree(rootId);
    }

    @Override
    public List<Topic> getTopics(@NonNull String rootId) {
        return getTopics(new ObjectId(rootId));
    }

    @Override
    public List<Topic> getTopics() {
        return topicRepository.getTopicTree();
    }

    @Override
    public Topic getTopic(ObjectId id) {
        return topicRepository.findById(id).orElse(null);
    }

    @Override
    public Topic getTopic(String id) {
        return getTopic(new ObjectId(id));
    }

    @Override
    public void deleteTopic(Topic topic) {
        topicRepository.delete(topic);
    }
}
