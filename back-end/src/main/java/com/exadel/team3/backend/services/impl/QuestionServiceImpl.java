package com.exadel.team3.backend.services.impl;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.QuestionService;

import java.util.List;

@Service
@Primary
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(@NonNull Question question) {
        return questionRepository.insert(question);
    }

    @Override
    public Question getQuestion(@NonNull ObjectId id) {
        return questionRepository.findById(id).orElse(null);
    }

    @Override
    public Question getQuestion(@NonNull String id) {
        return getQuestion(new ObjectId(id));
    }

    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public List<Question> getQuestionsByTopicIds(@NonNull List<ObjectId> topicIds) {
        return questionRepository.findByTopicIdsIn(topicIds);
    }

    @Override
    public List<Question> getQuestionsByQuestionIds(@NonNull List<ObjectId> questionIds) {
        return questionRepository.findByIdIn(questionIds);
    }

    @Override
    public Question updateQuestion(@NonNull Question question) {
        return questionRepository.save(question);
    }
    @Override
    public Question complainQuestion(@NonNull Question question) {
        if (question.getStatus() == QuestionStatus.ACTIVE) {
            question.setStatus(QuestionStatus.DISPUTED);
            return questionRepository.save(question);
        }
        return question;
    }

    @Override
    public void deleteQuestion(Question question) {
        questionRepository.delete(question);
    }

}
