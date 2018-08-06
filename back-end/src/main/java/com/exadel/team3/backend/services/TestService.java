package com.exadel.team3.backend.services;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.bson.types.ObjectId;

import com.exadel.team3.backend.dto.TestItemDTO;
import com.exadel.team3.backend.dto.UserRatingDTO;

import com.exadel.team3.backend.entities.Test;

public interface TestService extends AssignableService<Test> {

    Test generateTestForUser(String userId,
                             String title,
                             LocalDateTime start,
                             LocalDateTime deadline,
                             Collection<ObjectId> topicIds,
                             int questionsCount,
                             String assignedBy) throws ServiceException;

    Test generateTestForUser(String userId,
                             ObjectId topicId) throws ServiceException;

    List<Test> generateTestsForGroup(String group,
                               String title,
                               LocalDateTime start,
                               LocalDateTime deadline,
                               Collection<ObjectId> topicIds,
                               int questionsCount,
                               String assignedBy) throws ServiceException;

    Test submitTest(ObjectId id) throws ServiceException;
    Test submitTest(List<TestItemDTO> answers) throws ServiceException;

    Test submitAnswer(TestItemDTO answeredItem) throws ServiceException;
    Test submitManualAnswerCheck(TestItemDTO checkedItem) throws ServiceException;

    List<TestItemDTO> getAnswersForManualCheck(String assignedBy) throws ServiceException;

    List<UserRatingDTO> getTopRatingBySum(ObjectId topicId);
    List<UserRatingDTO> getTopRatingByAverage(ObjectId topicId);

}
