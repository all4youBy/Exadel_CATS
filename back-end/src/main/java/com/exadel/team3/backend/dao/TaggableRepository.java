package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.exadel.team3.backend.entities.Taggable;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

public interface TaggableRepository<T extends Taggable> extends MongoRepository<T, ObjectId> {
    List<T> findByTopicIdsInOrderByText(Collection<ObjectId> topicIds);
    List<T> findByAuthorOrderByText(String authorId);
}
