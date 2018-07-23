package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.services.QuestionService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/add")
    public ResponseEntity<?> addQuestion(@RequestBody Question question){

       Question q = questionService.addQuestion(question);

       if(q==null)
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add question");

       return ResponseEntity.status(HttpStatus.CREATED).body("Question added");
    }

    @GetMapping
    public List<Question> getQuestions(@RequestParam(required = false)List<ObjectId> topicsIds){
        if(topicsIds == null)
            return questionService.getQuestions();
        return questionService.getQuestionsByTopicIds(topicsIds);
    }

    @GetMapping("/{id}")
    public Question getQuestion(@PathVariable String id){
        return questionService.getQuestion(id);
    }


    @PutMapping
    public Question updateQuestion(@RequestBody Question question){
        return  questionService.updateQuestion(question);
    }

    @DeleteMapping
    public void deleteQuestion(@RequestBody Question question){
        questionService.deleteQuestion(question);
    }
}
