package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Topic;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.Test;

@Service
public interface TestService {
//    Test addTest(Test test);

    Test generateTestForUser(String userId, String title, LocalDateTime start, Collection<Topic> topics);
    void generateTestForGroup(String group);

    List<Test> getTestsAssignedToUser(String userId);
    List<Test> getTestsAssignedToGroup(String group);

    Test updateTest(Test test);

    Test getTest(String id);
    Test getTest(ObjectId id);

    void deleteTest(Test test);

}
