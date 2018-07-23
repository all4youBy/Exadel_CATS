package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.QuestionRepository;
import com.exadel.team3.backend.dao.TaggableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.QuestionService;

@Service
@Primary
public class QuestionServiceImpl
    extends TaggableServiceImpl<Question>
    implements QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    @Override
    protected TaggableRepository<Question> getRepository() {
        return questionRepository;
    }

    @Override
    public Question complain(@NonNull Question question) {
        if (question.getStatus() == QuestionStatus.ACTIVE) {
            question.setStatus(QuestionStatus.DISPUTED);
            return getRepository().save(question);
        }
        return question;
    }


}
