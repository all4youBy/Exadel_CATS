package com.exadel.team3.backend.services.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.exadel.team3.backend.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

import com.exadel.team3.backend.services.DbManagementService;
import com.exadel.team3.backend.dao.*;
import com.exadel.team3.backend.services.ServiceException;

@Service
@Primary
public class DbManagementServiceImpl implements DbManagementService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    TopicRepository topicRepository;
    @Autowired
    TestRepository testRepository;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    SolutionRepository solutionRepository;
    @Autowired
    PaperRepository paperRepository;
    @Autowired
    TaxonomyRepository taxonomyRepository;
    @Autowired
    FileStorage fileStorage;


    @Override
    public void reset() {
        fileStorage.deleteAll();
        taxonomyRepository.deleteAll();
        paperRepository.deleteAll();
        taskRepository.deleteAll();
        solutionRepository.deleteAll();
        testRepository.deleteAll();
        questionRepository.deleteAll();
        topicRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Override
    public void resetAndFillWithSampleData()  throws ServiceException{
        reset();
        ObjectMapper mapper = new ObjectMapper();
        fillCollectionWithSampleData(mapper, userRepository, User.class);
        fillCollectionWithSampleData(mapper, topicRepository, Topic.class);
        fillCollectionWithSampleData(mapper, questionRepository, Question.class);
        fillCollectionWithSampleData(mapper, taxonomyRepository, TaxonomyItem.class);
        fillCollectionWithSampleData(mapper, paperRepository, Paper.class);
    }


    private <T,ID> void fillCollectionWithSampleData(ObjectMapper mapper,
                                                     MongoRepository<T,ID> repository,
                                                     Class<T> entityClass) throws ServiceException{
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
        } catch (IOException e) {
            throw new ServiceException(
                    "Could not load sample values to collection of " +
                    entityClass.getSimpleName(), e);
        }
    }
}
