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
import org.springframework.lang.NonNull;

import java.util.Collection;
import java.util.List;

public class QuestionRepositoryImpl implements QuestionRepositoryAggregation {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Question> random(int count, @NonNull Collection<QuestionType> allowedTypes, boolean trainingOnly) {
        return random(count, null, allowedTypes, trainingOnly);
    }

    @Override
    public List<Question> random(int count, QuestionComplexity complexity, @NonNull Collection<QuestionType> allowedTypes, boolean trainingOnly) {
        SampleOperation sampleOperation = Aggregation.sample(count);
        MatchOperation matchOperation;
        if (complexity != null) {
            matchOperation = new MatchOperation(
                    new Criteria().andOperator(
                            Criteria.where("type").in(allowedTypes),
                            Criteria.where("training").is(true),
                            Criteria.where("complexity").is(complexity)
                    )
            );
        } else {
            matchOperation = new MatchOperation(
                    new Criteria().andOperator(
                            Criteria.where("type").in(allowedTypes),
                            Criteria.where("training").is(true)
                    )
            );
        }

        TypedAggregation<Question> aggregation = TypedAggregation.newAggregation(Question.class,matchOperation, sampleOperation);
        return mongoTemplate.aggregate(aggregation,"questions", Question.class).getMappedResults();
    }


}
