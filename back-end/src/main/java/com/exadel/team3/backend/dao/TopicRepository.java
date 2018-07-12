package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends MongoRepository<Topic, String>, TopicRepositoryAggregation {
}