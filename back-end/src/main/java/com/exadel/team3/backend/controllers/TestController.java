package com.exadel.team3.backend.controllers;


import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.security.requests.TestForGroupRequest;
import com.exadel.team3.backend.security.requests.TestGenerationRequest;
import com.exadel.team3.backend.security.requests.TrainingTestGenerationRequest;
import com.exadel.team3.backend.services.TestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cats")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping("/tests/test/{testId}")
    public Test getTest(@PathVariable(value = "testId") String testId){
        return testService.getTest(testId);
    }

    @PostMapping("/tests/test")
    public ResponseEntity<?> getTestForUser(@RequestBody TestGenerationRequest testRequest){
       Test test =  testService.generateTestForUser(testRequest.getUserId(),
                                        testRequest.getTitle(),
                                        testRequest.getStart(),
                                        testRequest.getDeadline(),
                                        testRequest.getTopicsId(),
                                        testRequest.getQuestionsCount(),
                                        testRequest.getAssignedBy());

       if(test == null)
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate test.");

       return ResponseEntity.ok().body(test);
    }

    @PostMapping("/tests/test/training")
    public ResponseEntity<?> getTrainingTestForUser(@RequestBody TrainingTestGenerationRequest testRequest){
        Test test = testService.generateTestForUser(testRequest.getUserId(),testRequest.getTopicId());
        if(test == null)
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate test.");

        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @PostMapping("/tests/group")
    public ResponseEntity<?> getTestForGroup(@RequestBody TestForGroupRequest testRequest){
        List<Test> testsForGroup = testService.generateTestsForGroup(testRequest.getGroup(),
                                                      testRequest.getTitle(),
                                                      testRequest.getStart(),
                                                      testRequest.getDeadline(),
                                                      testRequest.getTopicsId(),
                                                      testRequest.getQuestionsCount(),
                                                      testRequest.getAssignedBy());

        if(testsForGroup == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate tests for group.");

        return new ResponseEntity<>(testsForGroup,HttpStatus.OK);
    }

    @GetMapping("/tests")
    public ResponseEntity<?> getTestsAssignedToUser(@RequestParam(value = "user_id") String userId){
        List<Test> userTests = testService.getTestsAssignedToUser(userId);

        if(userTests == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get list of tests, user:" + userId);

        return new ResponseEntity<>(userTests,HttpStatus.OK);
    }

    @GetMapping("/tests/groups/{group}")
    public ResponseEntity<?> getTestsAssignedToGroup(@PathVariable(value = "group") String group){
        List<Test> groupTests = testService.getTestsAssignedToGroup(group);

        if(groupTests == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get list of tests, group:" + group);

        return new ResponseEntity<>(groupTests,HttpStatus.OK);
    }

    @PutMapping("/tests")
    public ResponseEntity<?> updateTest(@RequestBody Test test){
        return ResponseEntity.ok(testService.updateTest(test));
    }

    @DeleteMapping("/tests")
    public void deleteTest(@RequestBody Test test){
        testService.deleteTest(test);
    }
}

