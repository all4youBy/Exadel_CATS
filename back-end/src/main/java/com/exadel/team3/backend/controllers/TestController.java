package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.dto.TestItemDTO;
import com.exadel.team3.backend.dto.TestPostDTO;
import com.exadel.team3.backend.dto.mappers.TestDTOMapper;
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

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tests")
public class TestController {

    @Autowired
    private TestService testService;

    @Autowired
    private UserService userService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private TestDTOMapper testDTOMapper;

    @GetMapping("/{testId}")
    public ResponseEntity<?> getTest(@PathVariable(value = "testId") String testId){
        Test test = testService.getItem(new ObjectId(testId));


        return ResponseEntity.ok().body(testDTOMapper.convertToDTO(test));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//    @TestGenerationAccess
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

        return ResponseEntity.ok().body(test.getId());
    }

    @PostMapping(value = "/training",produces = MediaType.APPLICATION_JSON_VALUE)
    @TrainingTestGenerationAccess
    public ResponseEntity<?> getTrainingTestForUser(@RequestBody  TrainingTestGenerationRequest request){
        Test test = testService.generateTestForUser(request.getUserId(),request.getTopicId());
        if(test == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate test.");
        String id = test.getId().toString();
        return new ResponseEntity<>(id, HttpStatus.OK);
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

        List<TestPostDTO> testPostDTO = userTests.stream().map(this::convertToTestPostDTO).collect(Collectors.toList());
        return new ResponseEntity<>(testPostDTO,HttpStatus.OK);
    }

    @GetMapping("/answers-for-manual-check/{email}")
    public ResponseEntity<?> getAnswersForManualCheck(@PathVariable String email){
        List<TestItemDTO> answers = testService.getAnswersForManualCheck(email);

        if(answers == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get answers for manual check.");

        return ResponseEntity.ok().body(answers);
    }


    @GetMapping("/group-tests/{group}")
    public ResponseEntity<?> getTestsAssignedToGroup(@PathVariable(value = "group") String group){
        List<Test> groupTests = testService.getAssignedItemsToGroup(group);

        if(groupTests == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get list of tests, group:" + group);

        return new ResponseEntity<>(groupTests,HttpStatus.OK);
    }

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

    private TestPostDTO convertToTestPostDTO(Test test){
        return mapper.map(test,TestPostDTO.class);
    }
}

