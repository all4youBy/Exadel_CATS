package com.exadel.team3.backend.services;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.Test;

@Service
public interface TestService {

    Test generateTestForUser(String userId,
                             String title,
                             LocalDateTime start,
                             Duration duration,
                             Collection<ObjectId> topicIds,
                             int questionsCount,
                             String assignedBy);

    Test generateTestForUser(String userId,
                             ObjectId topicId);

    List<Test> generateTestsForGroup(String group,
                               String title,
                               LocalDateTime start,
                               Duration duration,
                               Collection<ObjectId> topicIds,
                               int questionsCount,
                               String assignedBy);

    List<Test> getTestsAssignedToUser(String userId);
    List<Test> getTestsAssignedToGroup(String group);

    Test updateTest(Test test);

    Test getTest(String id);
    Test getTest(ObjectId id);

    void deleteTest(Test test);

}
