package com.exadel.team3.backend.services.impl;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.exadel.team3.backend.dao.projections.QuestionAssessmentProjection;
import com.exadel.team3.backend.entities.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${cats.test.question.complexityRedefineThreshold}")
    int complexityRedefineThreshold;

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

    @Override
    public void reassessLatestQuestions() {
        List<ObjectId> latestQuestionIds = testRepository.findLastUsedQuestionIds(LocalDateTime.now().minusHours(24L));
        List<QuestionAssessmentProjection> assessments = testRepository.findQuestionUsage(latestQuestionIds);
        for (QuestionAssessmentProjection assessment : assessments) {
            if (assessment.getTotal() > complexityRedefineThreshold) {
                QuestionComplexity newComplexity = getQuestionComplexity(
                        assessment.getRight(),
                        assessment.getRight() + assessment.getWrong()
                );
                if (newComplexity != assessment.getComplexity()) {
                    Optional<Question> question = questionRepository.findById(assessment.getQuestionId());
                    if (question.isPresent()) {
                        question.get().setComplexity(newComplexity);
                        questionRepository.save(question.get());
                    }
                }
            }
        }
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

    private static QuestionComplexity getQuestionComplexity(int rightAnswers, int totalAnswers) {
        double easyRate = (double)rightAnswers / totalAnswers;
        if (easyRate >= 0.75) {
                return QuestionComplexity.LEVEL_1;
        } else if (easyRate >= 0.5) {
            return QuestionComplexity.LEVEL_2;
        } else if (easyRate >= 0.25) {
            return QuestionComplexity.LEVEL_3;
        } else {
            return QuestionComplexity.LEVEL_4;
        }
    }
}
