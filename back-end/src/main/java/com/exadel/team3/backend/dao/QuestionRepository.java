package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Question;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, ObjectId> {
    List<Question> findByTopicIdsIn(Collection<ObjectId> topicIds);
}