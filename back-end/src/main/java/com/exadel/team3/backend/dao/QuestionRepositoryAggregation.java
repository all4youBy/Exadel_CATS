package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;

import java.util.List;

public interface QuestionRepositoryAggregation {
    List<Question> random(int count, QuestionType type, boolean trainingOnly);
    List<Question> random(int count, QuestionComplexity complexity, boolean trainingOnly);
}
