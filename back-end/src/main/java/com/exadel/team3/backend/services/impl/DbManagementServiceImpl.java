package com.exadel.team3.backend.services.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.dao.TestRepository;
import com.exadel.team3.backend.dao.TopicRepository;
import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.entities.Topic;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.services.DbManagementService;

@Service
public class DbManagementServiceImpl implements DbManagementService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserRepository userRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    TopicRepository topicRepository;
    @Autowired
    TestRepository testRepository;


    @Override
    public void reset() {
        testRepository.deleteAll();
        questionRepository.deleteAll();
        topicRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Override
    public boolean resetAndFillWithSampleData() {
        reset();
        ObjectMapper mapper = new ObjectMapper();
        return  fillCollectionWithSampleData(mapper, userRepository, User.class)
            &&  fillCollectionWithSampleData(mapper, topicRepository, Topic.class)
//            &&  fillCollectionWithSampleData(mapper, testRepository, Test.class)
            &&  fillCollectionWithSampleData(mapper, questionRepository, Question.class);
    }

    private <T,ID> boolean fillCollectionWithSampleData(ObjectMapper mapper,
                                                        MongoRepository<T,ID> repository,
                                                        Class<T> entityClass) {
        CollectionType collectionType = mapper.getTypeFactory()
                .constructCollectionType(List.class, entityClass);
        try (
                InputStream inputStream = TypeReference.class.getResourceAsStream(
                        "/json/sample-" +
                                entityClass.getSimpleName().toLowerCase() +
                                "s.json"
                )
        ) {
            List<T> entities = mapper.readValue(inputStream, collectionType);
            repository.saveAll(entities);
            return true;
        } catch (IOException e) {
            logger.warn("Could not load sample values to collection of " +
                    entityClass.getSimpleName() + ": " +
                    e.getMessage());
            return false;
        }
    }
}
