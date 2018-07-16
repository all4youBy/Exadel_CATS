package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Topic;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TopicRepository extends MongoRepository<Topic, ObjectId>, TopicRepositoryAggregation {
    List<Topic> findByIdIn(Collection<ObjectId> ids);
}