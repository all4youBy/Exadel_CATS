package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionStatus;
import com.exadel.team3.backend.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cats")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

//    @GetMapping("/questions")
//    public List<Question> getQuestions(){
//        return questionService.getQuestions();
//    }

    @GetMapping("/questions")
    public List<Question> getQuestions(@RequestParam(required = false)List<String> topicsIds){
        if(topicsIds == null)
            return questionService.getQuestions();
        return questionService.getQuestions(topicsIds);
    }

    @GetMapping("/questions/{question_status}")
    public List<Question> getQuestions(@PathVariable(value = "question_status") QuestionStatus questionStatus){
       return questionService.getQuestions(questionStatus);
    }

    @GetMapping("/questions/{id}")
    public Question getQuestion(@PathVariable String id){
        return questionService.getQuestion(id);
    }

    @PostMapping("/questions")
    public Question addQuestion(@RequestBody Question question){
        return questionService.addQuestion(question);
    }


    @PutMapping("/questions")
    public Question updateQuestion(@RequestBody Question question){
        return  questionService.updateQuestion(question);
    }

    @DeleteMapping("/questions")
    public void deleteQuestion(@RequestBody Question question){
        questionService.deleteQuestion(question);
    }
}
