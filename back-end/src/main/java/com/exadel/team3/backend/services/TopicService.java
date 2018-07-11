package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Topic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TopicService {
    Topic addTopic(Topic topic);

    Topic updateTopic(Topic topic);

    Topic getTopic(String id);
    List<Topic> getTopics(String rootId);
    List<Topic> getTopics();

    void deleteTopic(Topic topic);
}
