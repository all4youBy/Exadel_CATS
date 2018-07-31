package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Test;
import com.exadel.team3.backend.controllers.requests.TestForGroupRequest;
import com.exadel.team3.backend.controllers.requests.TestGenerationRequest;
import com.exadel.team3.backend.controllers.requests.TrainingTestGenerationRequest;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.security.annotations.AdminAccess;
import com.exadel.team3.backend.security.annotations.TrainingTestGenerationAccess;
import com.exadel.team3.backend.security.annotations.TestGenerationAccess;
import com.exadel.team3.backend.services.QuestionService;
import com.exadel.team3.backend.services.TestService;
import com.exadel.team3.backend.services.UserService;

import org.bson.types.ObjectId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @Autowired
    private QuestionService questionService;

    @GetMapping("/{testId}")
    public Test getTest(@PathVariable(value = "testId") String testId){
        return testService.getItem(new ObjectId(testId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @TestGenerationAccess
    public ResponseEntity<?> getTestForUser(@RequestBody TestGenerationRequest request){

       Test test =  testService.generateTestForUser(request.getUserId(),
                                        request.getTitle(),
                                        request.getStart(),
                                        request.getDeadline(),
                                        request.getTopicsId(),
                                        request.getQuestionsCount(),
                                        request.getAssignedBy());

       if(test == null)
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate test.");

       return ResponseEntity.ok().body(test);
    }

    @PostMapping(value = "/training",produces = MediaType.APPLICATION_JSON_VALUE)
    @TrainingTestGenerationAccess
    public ResponseEntity<?> getTrainingTestForUser(@RequestBody  TrainingTestGenerationRequest request){
        Test test = testService.generateTestForUser(request.getUserId(),request.getTopicId());
        if(test == null)
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate test.");
//        List<Question> questionsFromTest = questionService.getItems()
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @PostMapping(value = "/test-for-group",produces = MediaType.APPLICATION_JSON_VALUE)
    @TestGenerationAccess
    public ResponseEntity<?> getTestForGroup(@RequestBody TestForGroupRequest request){

        User teacher = userService.getItem(request.getAssignedBy());
        String group = request.getGroup();

        if(!validateUser(teacher,group))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(String.format("No rights to set test for %s.",group));

        List<Test> testsForGroup = testService.generateTestsForGroup(request.getGroup(),
                                                      request.getTitle(),
                                                      request.getStart(),
                                                      request.getDeadline(),
                                                      request.getTopicsId(),
                                                      request.getQuestionsCount(),
                                                      request.getAssignedBy());

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

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> updateTest(@RequestBody Test test){
        return ResponseEntity.ok(testService.updateItem(test));
    }

    @DeleteMapping
    @AdminAccess
    public void deleteTest(@RequestBody Test test){
        testService.deleteItem(test);
    }

    private boolean validateUser(User user, String group){
        return user.getGroups().contains(group);
    }
}

