package com.exadel.team3.backend.dao.impl;

import com.exadel.team3.backend.dao.QuestionRepositoryAggregation;
import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.lang.NonNull;

import java.util.List;

public class QuestionRepositoryImpl implements QuestionRepositoryAggregation {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Question> random(int count, @NonNull QuestionType type, boolean trainingOnly) {
        return random(count, null, type, trainingOnly);
    }

    @Override
    public List<Question> random(int count, @NonNull QuestionComplexity complexity, boolean trainingOnly) {
        return random(count, complexity, null, trainingOnly);
    }

    private List<Question> random(int count, QuestionComplexity complexity, QuestionType type, boolean trainingOnly) {
        SampleOperation sampleOperation = Aggregation.sample(count);
        MatchOperation matchOperation = null;
        Criteria complexityOrTypeCriteria = null;
        if (complexity != null) {
            complexityOrTypeCriteria = Criteria.where("complexity").is(complexity);
        } else if (type != null) {
            complexityOrTypeCriteria = Criteria.where("type").is(type);
        }
        if (complexityOrTypeCriteria != null && trainingOnly) {
            matchOperation = new MatchOperation(
                    new Criteria().andOperator(
                            complexityOrTypeCriteria,
                            Criteria.where("training").is(true)
                    )
            );
        } else if (complexityOrTypeCriteria != null) {
            matchOperation = new MatchOperation(complexityOrTypeCriteria);
        } else if (trainingOnly) {
            matchOperation = new MatchOperation(Criteria.where("training").is(true));
        }
        TypedAggregation<Question> aggregation;
        if (matchOperation != null) {
            aggregation = TypedAggregation.newAggregation(Question.class,matchOperation, sampleOperation);
        } else {
            aggregation = TypedAggregation.newAggregation(Question.class, sampleOperation);
        }
        return mongoTemplate.aggregate(aggregation,"questions", Question.class).getMappedResults();
    }


}
