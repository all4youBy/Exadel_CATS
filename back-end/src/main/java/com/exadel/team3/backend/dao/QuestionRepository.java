package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByTopicIdsIn(List<String> topicIds);
}