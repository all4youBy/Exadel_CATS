package com.exadel.team3.backend.services;

import com.exadel.team3.backend.dto.TestItemDTO;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.Test;

public interface TestService  extends AssignableService<Test> {

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

    Test submitTest(ObjectId id);
    Test submitAnswer(TestItemDTO answeredItem);
    Test submitManualAnswerCheck(TestItemDTO checkedItem);

    List<TestItemDTO> getAnswersForManualCheck(String assignedBy);
}
