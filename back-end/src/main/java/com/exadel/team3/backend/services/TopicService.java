package com.exadel.team3.backend.services;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.entities.Topic;

@Service
public interface TopicService extends CrudService<Topic, ObjectId> {
//    List<Topic> getTopics();
//    List<Topic> getTopics(String rootId);
        List<Topic> getTopics(ObjectId rootId);
}
