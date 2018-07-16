package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;

import java.util.Collection;
import java.util.List;

public interface QuestionRepositoryAggregation {
    List<Question> random(int count, Collection<QuestionType> allowedTypes, boolean trainingOnly);
    List<Question> random(int count, QuestionComplexity complexity, Collection<QuestionType> allowedTypes, boolean trainingOnly);
}
