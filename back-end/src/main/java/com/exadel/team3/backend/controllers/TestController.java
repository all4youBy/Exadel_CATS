package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.dto.ObjectIdDTO;
import com.exadel.team3.backend.dto.JSONAnswerDTO;
import com.exadel.team3.backend.dto.TestItemDTO;
import com.exadel.team3.backend.dto.AssignableDTO;
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
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.TestService;
import com.exadel.team3.backend.services.UserService;

import org.bson.types.ObjectId;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.logging.Logger;

@RestController
@RequestMapping("/tests")
public class TestController {

    @Autowired
    private TestService testService;

    @Autowired
    private UserService userService;

    @Autowired
    private TestDTOMapper testDTOMapper;

    @GetMapping("/{testId}")
    public ResponseEntity<?> getTest(@PathVariable(value = "testId") String testId){
        Test test = testService.getItem(new ObjectId(testId));
//      
        return test.getDeadline().isBefore(LocalDateTime.now())?
                ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body(new JSONAnswerDTO("Can't get test,time is out.")):
                ResponseEntity.ok().body(testDTOMapper.convertToDTO(test));
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
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONAnswerDTO("Can't generate test."));

       return ResponseEntity.ok().body(new JSONAnswerDTO(test.getId().toString()));
    }

    @PostMapping(value = "/training",produces = MediaType.APPLICATION_JSON_VALUE)
    @TrainingTestGenerationAccess
    public ResponseEntity<?> getTrainingTestForUser(@RequestBody  TrainingTestGenerationRequest request){
        Test test = testService.generateTestForUser(request.getUserId(),request.getTopicId());
        if(test == null)
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(new ObjectIdDTO(test.getId()),HttpStatus.OK);
    }

    @PostMapping(value = "/for-group",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTestForGroup(@RequestBody TestForGroupRequest request){

        User teacher = userService.getItem(request.getAssignedBy());
        String group = request.getGroup();

        if(!validateUser(teacher,group))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JSONAnswerDTO(String.format("No rights to set test for %s.",group)));

        List<Test> testsForGroup = testService.generateTestsForGroup(
                                                      request.getGroup(),
                                                      request.getTitle(),
                                                      request.getStart(),
                                                      request.getDeadline(),
                                                      request.getTopicIds(),
                                                      request.getQuestionsCount(),
                                                      request.getAssignedBy());

        if(testsForGroup == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONAnswerDTO("Can't generate tests for group."));

        return new ResponseEntity<>(testsForGroup,HttpStatus.OK);
    }

    @GetMapping("/user-tests/{userId}")
    public ResponseEntity<?> getTestsAssignedToUser(@PathVariable(value = "userId") String userId){

        List<AssignableDTO> testDTOs = testService.getAssignedItemsWithTopics(userId);
        return new ResponseEntity<>(testDTOs, HttpStatus.OK);
    }

    @GetMapping("/answers-for-manual-check/{email}")
    public ResponseEntity<?> getAnswersForManualCheck(@PathVariable String email){
        List<TestItemDTO> answers = testService.getAnswersForManualCheck(email);

        if(answers == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONAnswerDTO("Can't get answers for manual check."));

        return ResponseEntity.ok().body(answers);
    }


    @GetMapping("/group-tests/{group}")
    public ResponseEntity<?> getTestsAssignedToGroup(@PathVariable(value = "group") String group){
        List<Test> groupTests = testService.getAssignedItemsToGroup(group);

        if(groupTests == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONAnswerDTO("Can't get list of tests, group:" + group));

        return new ResponseEntity<>(groupTests,HttpStatus.OK);
    }

    @PostMapping(value = "/submit-test",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitTest(@RequestBody ObjectId testId){
        try {
            testService.submitTest(testId);
        } catch (ServiceException e) {
           return ResponseEntity.status(HttpStatus.CONFLICT).body(new JSONAnswerDTO("Can't submit test."));
        }
        Test test = testService.getItem(testId);

        return test.getAssignedBy() == null?
                ResponseEntity.ok().body(new JSONAnswerDTO(test.getMark().toString())):
                ResponseEntity.ok().body(new JSONAnswerDTO("Test submit."));
    }

    @PostMapping(value = "/submit-question",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitAnswer(@RequestBody TestItemDTO testItemDTO){
        testService.submitAnswer(testItemDTO);
        return ResponseEntity.ok().body(HttpStatus.OK);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> updateTest(@RequestBody Test test){
        return ResponseEntity.ok(testService.updateItem(test));
    }

    @PutMapping(value = "/submit-manual",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitManualAnswerCheck(@RequestBody TestItemDTO checkItemDto) {

        Arrays.asList(checkItemDto.getTestId(),checkItemDto.getQuestionId()).forEach(System.out::println);
        testService.submitManualAnswerCheck(checkItemDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping(value = "/assigned-tests/{assignedTo}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTests(@PathVariable String assignedTo){
        return getResponse(assignedTo,testService::getAssignedItems);
    }
    @GetMapping(value = "/assigned-tests-finished/{assignedTo}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsFinished(@PathVariable String assignedTo){
        return getResponse(assignedTo,testService::getAssignedItemsFinished);
    }

    @GetMapping("/assigned-tests-unfinished/{assignedTo}")
    public ResponseEntity<?> getAssignedTestsUnfinished(@PathVariable String assignedTo){
        return getResponse(assignedTo,testService::getAssignedItemsUnfinished);
    }

    @GetMapping(value = "/assigned-tests-group/{assignedToGroup}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsToGroup(@PathVariable String assignedToGroup){
        return getResponse(assignedToGroup,testService::getAssignedItemsToGroup);
    }

    @GetMapping(value = "/assigned-tests-group-finished",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsToGroupFinished(@PathVariable String assignedToGroup){
        return getResponse(assignedToGroup,testService::getAssignedItemsToGroupFinished);
    }

    @GetMapping(value = "/assigned-tests-group-unfinished",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsToGroupUnfinished(@PathVariable String assignedToGroup){
        return getResponse(assignedToGroup,testService::getAssignedItemsToGroupUnfinished);
    }

    @DeleteMapping
    @AdminAccess
    public void deleteTest(@RequestBody Test test){
        testService.deleteItem(test);
    }
    private boolean validateUser(User user, String group){
        return user.getGroups().contains(group);
    }

    private <T,R> ResponseEntity<?> getResponse(T condition,Function<T,List<R>> resolver){
        List<R> items = resolver.apply(condition);

        return items == null? ResponseEntity.status(HttpStatus.NO_CONTENT).body(new JSONAnswerDTO(String.format("Can't find items assigned to %s",condition))):
                ResponseEntity.ok().body(items);
    }
}

