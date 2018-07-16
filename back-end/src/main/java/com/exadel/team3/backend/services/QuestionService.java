package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {
//    Question addQuestion(
//            QuestionType type,
//            String text,
//            QuestionComplexity complexity,
//            String author
//    );
//
//    Question addQuestion(
//            QuestionType type,
//            String text,
//            List<Answer> answers,
//            QuestionComplexity complexity,
//            String author
//    );
//
//    Question addQuestion(
//            QuestionType type,
//            String text,
//            List<String> topicIds,
//            List<Answer> answers,
//            QuestionComplexity complexity,
//            String author
//    );
//

    public Question addQuestion(Question question);

    List<Question> getQuestions();
    List<Question> getQuestions(List<String> topicIds);
    List<Question> getQuestions(QuestionStatus status);

    Question updateQuestion(Question question);

    Question getQuestion(String id);

    void deleteQuestion(Question question);
}
