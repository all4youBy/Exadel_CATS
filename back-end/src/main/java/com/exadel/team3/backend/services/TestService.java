package com.exadel.team3.backend.services;

import com.exadel.team3.backend.dto.TestItemDTO;
import com.exadel.team3.backend.entities.TestCompletionStatus;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.Test;

@Service
public interface TestService {

    Test generateTestForUser(String userId,
                             String title,
                             LocalDateTime start,
                             LocalDateTime deadline,
                             Collection<ObjectId> topicIds,
                             int questionsCount,
                             String assignedBy);

    Test generateTestForUser(String userId,
                             ObjectId topicId);

    List<Test> generateTestsForGroup(String group,
                               String title,
                               LocalDateTime start,
                               LocalDateTime deadline,
                               Collection<ObjectId> topicIds,
                               int questionsCount,
                               String assignedBy);

    List<Test> getTestsAssignedToUser(String userId);
    List<Test> getTestsAssignedToUser(String userId, TestCompletionStatus completion);
    List<Test> getTestsAssignedToGroup(String group);
    List<Test> getTestsAssignedToGroup(String group, TestCompletionStatus completion);

    Test updateTest(Test test);


    Test getTest(String id);
    Test getTest(ObjectId id);

    Test submitTest(ObjectId id);
    Test submitAnswer(TestItemDTO answeredItem);
    Test submitManualAnswerCheck(TestItemDTO checked);

    List<TestItemDTO> getAnswersForManualCheck(String assignedBy);

    void deleteTest(Test test);
}
