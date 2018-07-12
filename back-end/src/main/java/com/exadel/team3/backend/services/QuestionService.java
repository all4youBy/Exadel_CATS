package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {
    Question addQuestion(Question question);

    List<Question> getQuestions();
    List<Question> getQuestions(List<String> topicIds);

    Question updateQuestion(Question question);

    Question getQuestion(String id);

    void deleteQuestion(Question question);

}
