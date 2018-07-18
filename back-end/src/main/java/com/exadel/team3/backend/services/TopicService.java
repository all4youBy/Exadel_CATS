package com.exadel.team3.backend.services;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.entities.Topic;

@Service
public interface TopicService {
    Topic addTopic(Topic topic);

    Topic updateTopic(Topic topic);

    Topic getTopic(ObjectId id);
    Topic getTopic(String id);

    List<Topic> getTopics();
    List<Topic> getTopics(ObjectId rootId);
    List<Topic> getTopics(String rootId);

    void deleteTopic(Topic topic);
}
