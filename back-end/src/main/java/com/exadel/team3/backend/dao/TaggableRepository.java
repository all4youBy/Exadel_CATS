package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.exadel.team3.backend.entities.Taggable;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TaggableRepository<T extends Taggable> extends MongoRepository<T, ObjectId> {
    List<T> findByTopicIdsIn(Collection<ObjectId> topicIds);
}
