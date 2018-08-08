package com.exadel.team3.backend.services.impl;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

import com.exadel.team3.backend.services.mail.mail_sender.MailSender;
import com.exadel.team3.backend.services.mail.mail_types.MailTypes;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.exadel.team3.backend.dao.*;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.dto.TestItemDTO;
import com.exadel.team3.backend.dto.UserRatingDTO;
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
    private TestItemPicker testItemGenerator;
    @Autowired
    private TestChecker testChecker;
    @Autowired
    private MailSender mailSender;


    @Value("${site}")
    private String site;
    @Value("${page.test}")
    private String postfixForUser;
    @Value("${page.checkTests}")
    private String postfixForTeacher;


    @Value("${cats.test.defaultDuration:60}")
    private long defaultTestDuration;

    @Value("${cats.test.questionsCount:20}")
    private int defaultQuestionsCount;

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
                                    String assignedBy) throws ServiceException {

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
            List<ObjectId> trainingQuestionIds = getAssignedItems(userId, "")
                    .stream()
                    .filter(test -> test.getItems() != null)
                    .flatMap(test -> test.getItems().stream())
                    .map(TestItem::getQuestionId)
                    .distinct()
                    .collect(Collectors.toList());

            // collect topicIds that exist in questions answered by this user in his training tests
            List<ObjectId> trainingQuestionTopicIds = questionRepository.findByIdInOrderByText(trainingQuestionIds)
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
                : start.plus(Duration.ofMinutes(defaultTestDuration));
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
                    : defaultQuestionsCount,
                actualTopicIds,
                isTraining
        ));
        newTest.setAssignedBy(assignedBy);

        newTest = addItem(newTest);
        if (newTest.getAssignedBy() != null) {
            Map<String, String> replaceMap = new HashMap<>();
            replaceMap.put("&link", site + postfixForUser + newTest.getId());
            mailSender.send(MailTypes.USERS_NOTIFICATION_TEST, userId, replaceMap);
        }

        return newTest;
    }

    @Override
    public Test generateTestForUser(String userId, ObjectId topicId) throws ServiceException{
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
                                      @NonNull String assignedBy) throws ServiceException{
        return getUserIdsByGroupNameStream(group)
                .map(
                        userId -> {
                            try {
                                return generateTestForUser(
                                        userId,
                                        title,
                                        start,
                                        deadline,
                                        topicIds,
                                        questionsCount,
                                        assignedBy
                                );
                            } catch (ServiceException e) {
                                return null;
                            }
                        }
                )
                .collect(Collectors.toList());
    }

    @Override
    public Test submitTest(ObjectId testId) throws ServiceException{
        Optional<Test> updatedTest = testRepository.findById(testId);
        if (!updatedTest.isPresent()) {
            throw new ServiceException("There's no test [id=" + testId + "]");
        } else if (!getTestIsSubmittable(updatedTest.get())) {
            throw new ServiceException("The test [id=" + testId + "] has not started or already expired");
        }
        Test updatedTestObj = updatedTest.get();
        updatedTestObj.setDeadline(LocalDateTime.now());
        updatedTestObj.setMark(testChecker.checkTest(updatedTestObj));

        if (updatedTestObj.getMark() == null) {
            Map<String, String> replaceMap = new HashMap<>();
            replaceMap.put("&link", site + postfixForTeacher);
            mailSender.send(MailTypes.USERS_NOTIFICATION_TEST, updatedTestObj.getAssignedBy(), replaceMap);
        }

        return testRepository.save(updatedTestObj);
    }

    @Override
    public Test submitTest(@NonNull List<TestItemDTO> answers) throws ServiceException {
        List<ObjectId> testIds = answers
                .stream()
                .map(TestItemDTO::getTestId)
                .distinct()
                .collect(Collectors.toList());
        if (testIds.size() > 1) {
            Test updatedTest = null;
            for(ObjectId testId: testIds) {
                updatedTest = submitTest(
                        testId,
                        answers
                                .stream()
                                .filter(answer -> answer.getTestId().equals(testId))
                                .collect(Collectors.toList())
                );
            }
            return updatedTest;
        } else if (testIds.size() == 1) {
            return submitTest(testIds.get(0), answers);
        }
        return null;
    }

    private Test submitTest(ObjectId testId, List<TestItemDTO> answers) {
        Optional<Test> updatedTest = testRepository.findById(testId);
        if (!updatedTest.isPresent()) {
            throw new ServiceException("There's no test with id " + testId);
        } else if (!getTestIsSubmittable(updatedTest.get())) {
            throw new ServiceException("The test [id=" +
                    updatedTest.get().getTitle() +
                    "] has not started or already expired");
        }
        Test updatedTestObj = updatedTest.get();
        for (TestItemDTO answer: answers) {
            submitAnswer(updatedTestObj, answer, false);
        }
        updatedTestObj.setDeadline(LocalDateTime.now());
        updatedTestObj.setMark(testChecker.checkTest(updatedTestObj));
        return testRepository.save(updatedTestObj);
    }



    @Override
    public Test submitAnswer(@NonNull TestItemDTO answeredItem) throws ServiceException {
        Optional<Test> updatedTest = testRepository.findById(answeredItem.getTestId());
        if (!updatedTest.isPresent()) {
            throw new ServiceException("There's no test with id " + answeredItem.getTestId());
        } else if (!getTestIsSubmittable(updatedTest.get())) {
            throw new ServiceException("The test [id=" +
                    updatedTest.get().getTitle() +
                    "] has not started or already expired");
        }
        return testRepository.save(
                submitAnswer(updatedTest.get(), answeredItem, true)
        );
    }

    private Test submitAnswer(Test test, TestItemDTO answeredItem, boolean doTestCheck) throws ServiceException {
        Optional<TestItem> updatedItem =
                test.getItems()
                        .stream()
                        .filter(item -> item.getQuestionId().equals(answeredItem.getQuestionId()))
                        .findFirst();
        Optional<Question> questionToUpdatedItem =
                updatedItem.flatMap(item -> questionRepository.findById(item.getQuestionId()));

        if (!questionToUpdatedItem.isPresent()) {
            throw new ServiceException("There's no question with id " + answeredItem.getTestId());
        }

        TestItem updatedItemObj = updatedItem.get();
        updatedItemObj.setAnswer(answeredItem.getAnswer());
        updatedItemObj.setStatus(
                testChecker.checkAnswer(questionToUpdatedItem.get(), answeredItem.getAnswer())
        );
        if (doTestCheck) test.setMark(testChecker.checkTest(test));
        return test;
    }

    @Override
    public Test submitManualAnswerCheck(@NonNull TestItemDTO checkedItem) throws ServiceException{
        Optional<Test> updatedTest = testRepository.findById(checkedItem.getTestId());
        if (updatedTest.isPresent()) {
            Test updatedTestObj = updatedTest.get();
            Optional<TestItem> updatedItem = updatedTestObj.getItems()
                    .stream()
                    .filter(item -> item.getQuestionId().equals(checkedItem.getQuestionId()))
                    .findFirst();

            if (updatedItem.isPresent()) {
                updatedItem.get().setStatus(checkedItem.getStatus());
                updatedTestObj.setDeadline(LocalDateTime.now());
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
    public List<UserRatingDTO> getTopRatingBySum(@NonNull ObjectId topicId) {
        return getTopRating(testRepository::collectRatingBySum, topicId);
    }

    @Override
    public List<UserRatingDTO> getTopRatingByAverage(@NonNull ObjectId topicId) {
        return getTopRating(testRepository::collectRatingByAverage, topicId);
    }

    @Override
    public List<TestItemDTO> getAnswersForManualCheck(@NonNull String assignedBy) {
        return testRepository.findNeedingManualCheck(assignedBy).stream().map(
                item -> new TestItemDTO(
                                item.getId(),
                                item.getQuestionId(),
                                item.getAnswer(),
                                item.getStatus(),
                                item.getText()
                )
        )
        .collect(Collectors.toList());
    }

    private List<UserRatingDTO> getTopRating(
            BiFunction<List<ObjectId>, Integer, List<RatingProjection>> collector,
            ObjectId topicId
    ) {
        return collector.apply(
                        topicRepository.getTopicTree(topicId)
                                .stream()
                                .map(Topic::getId)
                                .distinct()
                                .collect(Collectors.toList()),
                        getTopRatingListSize()
                )
                .stream()
                .filter(
                        projection ->
                                !StringUtils.isEmpty(projection.getFirstName()) &&
                                !StringUtils.isEmpty(projection.getLastName())
                )
                .map(
                        projection ->
                                new UserRatingDTO(
                                        projection.getFirstName(),
                                        projection.getLastName(),
                                        projection.getRating())
                )
                .collect(Collectors.toList());
    }

    private static boolean getTestIsSubmittable(Test test) {
        return test.getStart().isBefore(LocalDateTime.now())
                && test.getDeadline().isAfter(LocalDateTime.now());
    }
}
