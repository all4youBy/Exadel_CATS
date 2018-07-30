package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;

import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;

public interface QuestionRepositoryAggregation {
    List<Question> random(int count, Collection<ObjectId> allowedTopics, Collection<QuestionType> allowedTypes, boolean trainingOnly);
    List<Question> random(int count, Collection<ObjectId> allowedTopics, Collection<QuestionType> allowedTypes, QuestionComplexity complexity, boolean trainingOnly);
}
