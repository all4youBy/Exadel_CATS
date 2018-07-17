package com.exadel.team3.backend.services.impl;

import org.bson.types.ObjectId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;

import com.exadel.team3.backend.dao.TestRepository;
import com.exadel.team3.backend.services.TestService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.dao.TopicRepository;
import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.TestItemPicker;

@Service
public class TestServiceImpl implements TestService {
    @Autowired
    private Environment env;

    @Autowired
    private TestRepository testRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private TestItemPicker testItemGenerator;

    @Override
    public Test generateTestForUser(@NonNull String userId,
                                    String title,
                                    LocalDateTime start,
                                    Duration duration,
                                    Collection<ObjectId> topicIds,
                                    int questionsCount,
                                    String assignedBy) {

        boolean isTraining = StringUtils.isEmpty(assignedBy);
        Collection<ObjectId> actualTopicIds =
                topicIds != null && topicIds.size() > 0
                ? topicIds
                        .stream()
                        .map(ti -> topicRepository.getTopicTree(ti))
                        .flatMap(Collection::stream)
                        .distinct()
                        .map(Topic::getId)
                        .collect(Collectors.toList())
                : topicRepository.getTopicTree()
                        .stream()
                        .map(Topic::getId)
                        .collect(Collectors.toList());

        if (isTraining) {
            // collect question ids  associated with training tests of this particular user
            // (training tests are those where assignedBy == null)
            List<ObjectId> trainingQuestionIds = testRepository.findByAssignedToAndAssignedBy(userId, null)
                    .stream()
                    .filter(test -> test.getItems() != null)
                    .flatMap(test -> test.getItems().stream())
                    .map(TestItem::getQuestionId)
                    .distinct()
                    .collect(Collectors.toList());

            // collect topicIds that exist in questions answered by this user in his training tests
            List<ObjectId> trainingQuestionTopicIds = questionRepository.findByIdIn(trainingQuestionIds)
                    .stream()
                    .flatMap(question -> question.getTopicIds().stream())
                    .distinct()
                    .collect(Collectors.toList());
            actualTopicIds.removeAll(trainingQuestionTopicIds);
            if (actualTopicIds.size() == 0) {
                throw new ServiceException("Cannot assign training test on this topic");
            }
        }

        Test newTest = new Test(
                userId,
                !StringUtils.isEmpty(title)
                        ? title
                        : topicRepository.findByIdIn(actualTopicIds)
                                .stream()
                                .map(Topic::getText)
                                .collect(Collectors.joining(", ")),
                start != null
                    ? start
                    : LocalDateTime.now(),
                duration != null
                    ? duration
                    : Duration.ofMinutes(Long.parseLong(env.getProperty("cats.test.defaultDuration", "60")))
        );
        newTest.setItems(testItemGenerator.generate(
                questionsCount > 0
                    ? questionsCount
                    : Integer.parseInt(env.getProperty("cats.test.questionsCount", "10")),
                actualTopicIds,
                isTraining
        ));
        newTest.setAssignedBy(assignedBy);

        return addTest(newTest);
    }

    @Override
    public Test generateTestForUser(String userId, ObjectId topicId) {
        return generateTestForUser(userId, null, null, null, Arrays.asList(topicId), 0, null);
    }

    @Override
    public List<Test> generateTestsForGroup(@NonNull String group,
                                      @NonNull String title,
                                      LocalDateTime start,
                                      Duration duration,
                                      Collection<ObjectId> topicIds,
                                      int questionsCount,
                                      @NonNull String assignedBy) {
        return userRepository.findStudentsByGroupName(group).stream()
                .map(User::getEmail)
                .map(id -> generateTestForUser(id, title, start, duration, topicIds, questionsCount, assignedBy))
                .collect(Collectors.toList());
    }


    private Test addTest(@NonNull Test test) {
        return testRepository.insert(test);
    }

    @Override
    public List<Test> getTestsAssignedToUser(@NonNull String userId) {
        return testRepository.findByAssignedToOrderByStart(userId);
    }

    @Override
    public List<Test> getTestsAssignedToGroup(@NonNull String group) {
        return testRepository.findByAssignedToInOrderByStart(
                userRepository.findStudentsByGroupName(group).stream()
                        .map(User::getEmail)
                        .collect(Collectors.toList())
        );
    }

    @Override
    public Test updateTest(Test test) {
        return testRepository.save(test);
    }

    @Override
    public Test getTest(String id) {
        return getTest(new ObjectId(id));
    }

    @Override
    public Test getTest(ObjectId id) {
        return testRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteTest(Test test) {
        testRepository.delete(test);
    }
}
