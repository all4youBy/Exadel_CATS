package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.Topic;
import com.exadel.team3.backend.entities.User;
import org.bson.types.ObjectId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;

import com.exadel.team3.backend.dao.TestRepository;
import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.services.TestService;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class TestServiceImpl implements TestService {
    @Autowired
    private TestRepository testRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRepository topicRepository;

    @Override
    public Test generateTestForUser(@NonNull String userId,
                                    String title,
                                    LocalDateTime start,
                                    Collection<Topic> topics) {
        Test t = new Test(userId, title);
        return addTest(t);
    }

    @Override
    public void generateTestForGroup(@NonNull String group) {
//        userRepository.findStudentsByGroupName(group).stream()
//                .map(User::getEmail)
//                .forEach(this::generateTestForUser);
    }


    private Test addTest(@NonNull Test test) {
        return testRepository.insert(test);
    }

    @Override
    public List<Test> getTestsAssignedToUser(@NonNull String userId) {
        return testRepository.findByAssignedToOrderByStartingDate(userId);
    }

    @Override
    public List<Test> getTestsAssignedToGroup(@NonNull String group) {
        return testRepository.findByAssignedToInOrderByStartingDate(
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
