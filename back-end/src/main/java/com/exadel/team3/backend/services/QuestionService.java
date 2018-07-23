package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.*;
import org.springframework.stereotype.Service;

public interface QuestionService extends TaggableService<Question> {
    Question complain(Question question);
}
