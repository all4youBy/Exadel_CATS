package com.exadel.team3.backend.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.TopicRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.TopicService;

import java.util.Set;

@Service
public class TopicServiceImpl implements TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Override
    public Topic addTopic(@NonNull String text) {
        return topicRepository.insert(new Topic(text));
    }

    @Override
    public Topic addTopic(String text, Set<Topic> subtopics) {
        Topic topic = new Topic(text);
        topic.setTopics(subtopics);
        return topicRepository.insert(topic);
    }

    @Override
    public Topic updateTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    @Override
    public Topic getTopic(String id) {
        return topicRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteTopic(Topic topic) {
        topicRepository.delete(topic);
    }
}
