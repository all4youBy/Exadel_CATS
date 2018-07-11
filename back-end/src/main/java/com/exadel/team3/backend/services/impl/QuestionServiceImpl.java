package com.exadel.team3.backend.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.QuestionService;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private QuestionRepository questionRepository;



    public Question addQuestion(Question question) {
        try {
            return questionRepository.insert(question);
        } catch (DataAccessException dae) {
            logger.error("Could not insert question \"" + question.getText() + "\": " + dae.getMessage());
            return null;
        }
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
    public List<Question> getQuestions(QuestionStatus status) {
        return questionRepository.findByStatus(status);
    }

    @Override
    public Question updateQuestion(@NonNull Question question) {
        try {
            return questionRepository.save(question);
        } catch (DataAccessException dae) {
            logger.error("Could not update question id " + question.getId() + ":" + dae.getMessage());
            return null;
        }
    }

    @Override
    public void deleteQuestion(Question question) {
        try {
            questionRepository.delete(question);
        } catch (DataAccessException dae) {
            logger.error("Could not delete question id " + question.getId() + ": " + dae.getMessage());
        }
    }

}
