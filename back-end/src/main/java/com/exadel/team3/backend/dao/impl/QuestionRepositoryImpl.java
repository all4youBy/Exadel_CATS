package com.exadel.team3.backend.dao.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.bson.types.ObjectId;

import com.exadel.team3.backend.dao.QuestionRepositoryAggregation;
import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;
import com.exadel.team3.backend.entities.QuestionStatus;

@Repository
public class QuestionRepositoryImpl implements QuestionRepositoryAggregation {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Question> random(int count, @NonNull Collection<ObjectId> allowedTopics, @NonNull Collection<QuestionType> allowedTypes, boolean trainingOnly) {
        return random(count, allowedTopics, allowedTypes, null, trainingOnly);
    }

    @Override
    public List<Question> random(int count, @NonNull Collection<ObjectId> allowedTopics,  @NonNull Collection<QuestionType> allowedTypes, QuestionComplexity complexity, boolean trainingOnly) {
        Criteria matchCriteria = Criteria
                .where("topicIds").in(allowedTopics)
                .and("type").in(allowedTypes)
                .and("status").in(QuestionStatus.ACTIVE, QuestionStatus.CONFIRMED);
        if (complexity != null) matchCriteria = matchCriteria.and("complexity").is(complexity);
        if (trainingOnly) matchCriteria = matchCriteria.and("training").is(true);
        MatchOperation matchOperation = new MatchOperation(matchCriteria);

        SampleOperation sampleOperation = Aggregation.sample(count);

        TypedAggregation<Question> aggregation = TypedAggregation.newAggregation(Question.class, matchOperation, sampleOperation);
        return mongoTemplate.aggregate(aggregation,"questions", Question.class).getMappedResults();
    }



}
