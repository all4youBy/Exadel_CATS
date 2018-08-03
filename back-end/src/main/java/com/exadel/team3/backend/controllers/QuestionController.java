package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.AddQuestionRequest;
import com.exadel.team3.backend.dto.StringAnswerDTO;
import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionStatus;
import com.exadel.team3.backend.security.annotations.AdminAccess;
import com.exadel.team3.backend.security.annotations.AdminAndTeacherAccess;
import com.exadel.team3.backend.services.QuestionService;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAndTeacherAccess
    public ResponseEntity<?> addQuestion(@RequestBody AddQuestionRequest question, Principal principal){

        Question quest = mapper.map(question, Question.class);
        quest.setAuthor(principal.getName());
        Question q = questionService.addItem(quest);

        if(q == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringAnswerDTO("Can't add question"));

        return ResponseEntity.status(HttpStatus.CREATED).body(new StringAnswerDTO("Question added"));
    }

    @PutMapping(value = "/complain",consumes = "text/plain",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> complainOnQuestion(@RequestBody  String questionId){

        ObjectId id = new ObjectId(questionId);
        Question question = questionService.getItem(id);
        question = questionService.complain(question);

        if(question.getStatus().equals(QuestionStatus.DISPUTED))
            return ResponseEntity.ok().body(new StringAnswerDTO("Confirm on question accepted"));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringAnswerDTO("Confirm on question doesn't accepted"));
    }

    @GetMapping
    @AdminAndTeacherAccess
    public List<Question> getQuestions(@RequestParam(value = "topics",required = false)List<ObjectId> topicsIds){
        if(topicsIds == null)
            return questionService.getItems();
        return questionService.getItemsByTopicIds(topicsIds);
    }

    @GetMapping("/{id}")
    @AdminAndTeacherAccess
    public Question getQuestion(@PathVariable String id){
        return questionService.getItem(new ObjectId(id));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public Question updateQuestion(@RequestBody Question question){
        return  questionService.updateItem(question);
    }

    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public void deleteQuestion(@RequestBody Question question){
        questionService.deleteItem(question);
    }

}
