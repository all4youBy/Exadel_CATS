package com.exadel.team3.backend.services.impl;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.exadel.team3.backend.dao.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.exadel.team3.backend.dto.TestItemDTO;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.TestItemPicker;
import com.exadel.team3.backend.services.TestService;
import com.exadel.team3.backend.services.TestChecker;

@Service
@Primary
public class TestServiceImpl
        extends AssignableServiceImpl<Test>
        implements TestService {

    @Autowired
    private TestRepository testRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private Environment env;
    @Autowired
    private TestItemPicker testItemGenerator;
    @Autowired
    private TestChecker testChecker;


    @Override
    protected AssignableRepository<Test> getRepository() {
        return testRepository;
    }

    @Override
    public Test generateTestForUser(@NonNull String userId,
                                    String title,
                                    LocalDateTime start,
                                    LocalDateTime deadline,
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
            List<ObjectId> trainingQuestionIds = getAssignedItems(userId)
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

        start = start != null ? start :LocalDateTime.now();
        deadline = deadline != null && deadline.isAfter(start)
                ? deadline
                : start.plus(Duration.ofMinutes(
                                Long.parseLong(env.getProperty("cats.test.defaultDuration", "60"))
                  ));
        title = !StringUtils.isEmpty(title)
                ? title
                : topicRepository.findByIdIn(actualTopicIds)
                .stream()
                .map(Topic::getText)
                .collect(Collectors.joining(", "));

        Test newTest = new Test(userId, title, start, deadline);
        newTest.setItems(testItemGenerator.generate(
                questionsCount > 0
                    ? questionsCount
                    : Integer.parseInt(env.getProperty("cats.test.questionsCount", "10")),
                actualTopicIds,
                isTraining
        ));
        newTest.setAssignedBy(assignedBy);

        return addItem(newTest);
    }

    @Override
    public Test generateTestForUser(String userId, ObjectId topicId) {
        return generateTestForUser(
                userId,
                null,
                null,
                null,
                Collections.singletonList(topicId),
                0,
                null
        );
    }

    @Override
    public List<Test> generateTestsForGroup(@NonNull String group,
                                      @NonNull String title,
                                      LocalDateTime start,
                                      LocalDateTime deadline,
                                      Collection<ObjectId> topicIds,
                                      int questionsCount,
                                      @NonNull String assignedBy) {
        return getUserIdsByGroupNameStream(group)
                .map(
                    userId -> generateTestForUser(
                        userId, title, start, deadline, topicIds, questionsCount, assignedBy
                    )
                )
                .collect(Collectors.toList());
    }


    public List<Test> getAssignedItems(@NonNull String userId, TestCompletionStatus completion) {
        switch(completion) {
            case UNFINISHED:
                return getAssignedItems(userId, LocalDateTime.now(),false);
            case FINISHED:
                return getAssignedItems(userId, LocalDateTime.now(),true);
            default:
                return getAssignedItems(userId);
        }
    }

    public List<Test> getAssignedItemsToGroup(@NonNull String group, @NonNull TestCompletionStatus completion) {
        switch(completion) {
            case UNFINISHED:
                return getAssignedItemsToGroup(group, LocalDateTime.now(),false);
            case FINISHED:
                return getAssignedItemsToGroup(group, LocalDateTime.now(),true);
            default:
                return getAssignedItemsToGroup(group);
        }
    }

    @Override
    public Test submitTest(ObjectId testId) {
        Optional<Test> updatedTest = testRepository.findById(testId);
        if (updatedTest.isPresent()) {
            Test updatedTestObj = updatedTest.get();
            if (updatedTestObj.getDeadline().isAfter(LocalDateTime.now())) {
                updatedTestObj.setDeadline(LocalDateTime.now());
                updatedTestObj.setMark(testChecker.checkTest(updatedTestObj));
                return testRepository.save(updatedTestObj);
            } else {
                return updatedTestObj;
            }
        } else {
            throw new ServiceException("There's no test with id " + testId);
        }
    }

    @Override
    public Test submitAnswer(@NonNull TestItemDTO answeredItem) {
        Optional<Test> updatedTest = testRepository.findById(answeredItem.getTestId());
        if (!updatedTest.isPresent()) {
            throw new ServiceException("There's no test with id " + answeredItem.getTestId());
        } else if (updatedTest.get().getDeadline().isBefore(LocalDateTime.now())) {
            throw new ServiceException("The test with id " + answeredItem.getTestId() + " is already closed");
        }
        Test updatedTestObj = updatedTest.get();
        Optional<TestItem> updatedItem =
                updatedTestObj.getItems()
                    .stream()
                    .filter(item -> item.getQuestionId().equals(answeredItem.getQuestionId()))
                    .findFirst();
        Optional<Question> questionToUpdatedItem =
                updatedItem.flatMap(item -> questionRepository.findById(item.getQuestionId()));

        if (questionToUpdatedItem.isPresent()) {
            TestItem updatedItemObj = updatedItem.get();
            updatedItemObj.setAnswer(answeredItem.getAnswer());
            updatedItemObj.setStatus(
                    testChecker.checkAnswer(questionToUpdatedItem.get(), answeredItem.getAnswer())
            );
            updatedTestObj.setMark(testChecker.checkTest(updatedTestObj));
            return testRepository.save(updatedTestObj);
        } else {
            throw new ServiceException("There's no question with id " + answeredItem.getTestId());
        }
    }

    @Override
    public Test submitManualAnswerCheck(@NonNull TestItemDTO checkedItem) {
        Optional<Test> updatedTest = testRepository.findById(checkedItem.getTestId());
        if (updatedTest.isPresent()) {
            Test updatedTestObj = updatedTest.get();
            Optional<TestItem> updatedItem = updatedTestObj.getItems()
                    .stream()
                    .filter(item -> item.getQuestionId().equals(checkedItem.getQuestionId()))
                    .findFirst();

            if (updatedItem.isPresent()) {
                updatedItem.get().setStatus(checkedItem.getStatus());
                updatedTestObj.setMark(testChecker.checkTest(updatedTestObj));
                return testRepository.save(updatedTestObj);
            } else {
                throw new ServiceException("There's no answer in test with id " +
                        checkedItem.getTestId() +
                        " that would correspond to question with id " +
                        checkedItem.getQuestionId());
            }
        } else {
            throw new ServiceException("There's no test with id " + checkedItem.getTestId());
        }
    }


    @Override
    public List<TestItemDTO> getAnswersForManualCheck(@NonNull String assignedBy) {
        return testRepository.findNeedingManualCheck(assignedBy,LocalDateTime.now())
                .stream().flatMap(
                    test -> test.getItems()
                            .stream()
                            .filter(item -> item.getStatus() == TestItemStatus.UNCHECKED)
                            .map(
                                    item ->
                                    new TestItemDTO(test.getId(), item.getQuestionId(), item.getAnswer())
                            )
                )
                .collect(Collectors.toList());
    }
}
