package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionStatus;
import com.exadel.team3.backend.security.annotations.AdminAccess;
import com.exadel.team3.backend.security.annotations.AdminAndTeacherAccess;
import com.exadel.team3.backend.services.QuestionService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAndTeacherAccess
    public ResponseEntity<?> addQuestion(@RequestBody Question question){

        Question q = questionService.addItem(question);

        if(q == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add question");

        return ResponseEntity.status(HttpStatus.CREATED).body("Question added");
    }

    @PutMapping(value = "/complain",consumes = "text/plain",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> complainOnQuestion(@RequestBody  String questionId){

        ObjectId id = new ObjectId(questionId);
        Question question = questionService.getItem(id);
        question = questionService.complain(question);

        if(question.getStatus().equals(QuestionStatus.DISPUTED))
            return ResponseEntity.ok().body("Confirm on question accepted");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Confirm on question doesn't accepted");
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
