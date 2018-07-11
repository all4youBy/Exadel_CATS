package com.exadel.team3.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.QuestionService;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(
            @NonNull QuestionType type,
            @NonNull String text,
            @NonNull QuestionComplexity complexity,
            @NonNull String author
    ) {
        return questionRepository.insert(new Question(type, text, complexity, author));
    }

    @Override
    public Question addQuestion(
            @NonNull QuestionType type,
            @NonNull String text,
            List<Answer> answers,
            @NonNull QuestionComplexity complexity,
            @NonNull String author
    ) {
        Question question = new  Question(type, text, complexity, author);
        question.setAnswers(answers);
        return questionRepository.insert(question);
    }

    @Override
    public Question addQuestion(
            @NonNull QuestionType type,
            @NonNull String text,
            List<String> topicIds,
            List<Answer> answers,
            @NonNull QuestionComplexity complexity,
            @NonNull String author
    ) {
        Question question = new  Question(type, text, complexity, author);
        question.setAnswers(answers);
        question.setTopicIds(topicIds);
        return questionRepository.insert(question);
    }

    @Override
    public Question getQuestion(@NonNull String id) {
        return questionRepository.findById(id).orElse(null);
    }


    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public List<Question> getQuestions(@NonNull List<String> topicIds) {
        return questionRepository.findByTopicIdsIn(topicIds);
    }

    @Override
    public Question updateQuestion(@NonNull Question question) {
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Question question) {
        questionRepository.delete(question);
    }

}
