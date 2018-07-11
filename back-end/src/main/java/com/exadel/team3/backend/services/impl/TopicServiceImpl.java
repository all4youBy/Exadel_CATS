package com.exadel.team3.backend.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.TopicRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.TopicService;

import java.util.Set;

@Service
public class TopicServiceImpl implements TopicService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TopicRepository topicRepository;

    @Override
    public Topic addTopic(@NonNull String text) {
        return addTopic(new Topic(text));
    }

    @Override
    public Topic addTopic(String text, Set<Topic> subtopics) {
        Topic topic = new Topic(text);
        topic.setTopics(subtopics);
        return addTopic(topic);
    }

    private Topic addTopic(Topic topic) {
        try {
            return topicRepository.insert(topic);
        } catch (DataAccessException dae) {
            logger.error("Could not add topic id " + topic.getId() + ": " + dae.getMessage());
            return null;
        }
    }

    @Override
    public Topic updateTopic(Topic topic) {
        try {
            return topicRepository.save(topic);
        } catch (DataAccessException dae) {
            logger.error("Could not update topic id " + topic.getId() + ": " + dae.getMessage());
            return null;
        }
    }

    @Override
    public Topic getTopic(String id) {
        return topicRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteTopic(Topic topic) {
        try {
            topicRepository.delete(topic);
        } catch (DataAccessException dae) {
            logger.error("Could not delete topic id " + topic.getId() + ": " + dae.getMessage());
        }
    }
}
