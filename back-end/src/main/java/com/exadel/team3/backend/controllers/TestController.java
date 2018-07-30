package com.exadel.team3.backend.controllers;


import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.controllers.requests.TestForGroupRequest;
import com.exadel.team3.backend.controllers.requests.TestGenerationRequest;
import com.exadel.team3.backend.controllers.requests.TrainingTestGenerationRequest;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.services.TestService;
import com.exadel.team3.backend.services.UserService;

import org.bson.types.ObjectId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tests")
public class TestController {

    @Autowired
    private TestService testService;

    @Autowired
    private UserService userService;

    @GetMapping("/{testId}")
    public Test getTest(@PathVariable(value = "testId") String testId){
        return testService.getItem(new ObjectId(testId));
    }

    @PostMapping
    //TODO simplify дичь снизу
    @PreAuthorize("hasRole('ADMIN') or (hasRole('TEACHER') and testRequest.assignedBy == authentication.name)")
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

    @PostMapping("/training")
    @PreAuthorize("#testRequest.userId == authentication.name")
    public ResponseEntity<?> getTrainingTestForUser(@RequestBody  TrainingTestGenerationRequest testRequest){
        Test test = testService.generateTestForUser(testRequest.getUserId(),testRequest.getTopicId());
        if(test == null)
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate test.");

        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @PostMapping("/test-for-group")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER') and testRequest.assignedBy == authentication.name")
    public ResponseEntity<?> getTestForGroup(@RequestBody TestForGroupRequest testRequest){

        User teacher = userService.getItem(testRequest.getAssignedBy());
        String group = testRequest.getGroup();

        if(!validateUser(teacher,group))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(String.format("No rights to set test for %s.",group));

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

    @GetMapping("/user-tests/{userId}")
    public ResponseEntity<?> getTestsAssignedToUser(@PathVariable(value = "userId") String userId){
        List<Test> userTests = testService.getAssignedItems(userId);

        if(userTests == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get list of tests, user:" + userId);

        return new ResponseEntity<>(userTests,HttpStatus.OK);
    }

    @GetMapping("/group-tests/{group}")
    public ResponseEntity<?> getTestsAssignedToGroup(@PathVariable(value = "group") String group){
        List<Test> groupTests = testService.getAssignedItemsToGroup(group);

        if(groupTests == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get list of tests, group:" + group);

        return new ResponseEntity<>(groupTests,HttpStatus.OK);
    }

//    @PostMapping("/")
//    public ResponseEntity<?> submitTest(@RequestBody ObjectId testId){
//        try {
//            testService.submitTest(testId);
//        } catch (ServiceException e) {
//            System.out.println();
//        }
//    }

    @PutMapping
    public ResponseEntity<?> updateTest(@RequestBody Test test){
        return ResponseEntity.ok(testService.updateItem(test));
    }

    @DeleteMapping
    public void deleteTest(@RequestBody Test test){
        testService.deleteItem(test);
    }

    private boolean validateUser(User user, String group){
        return user.getGroups().contains(group);
    }
}

