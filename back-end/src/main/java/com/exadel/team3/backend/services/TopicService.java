package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Topic;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface TopicService {
    Topic addTopic(String text);
    Topic addTopic(String text, Set<Topic> subtopics);

    Topic updateTopic(Topic topic);

    Topic getTopic(String id);

    void deleteTopic(Topic topic);
}
