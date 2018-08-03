package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Question;
import com.exadel.team3.backend.entities.QuestionComplexity;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

public interface QuestionRepository extends TaggableRepository<Question>, QuestionRepositoryAggregation {
    List<ObjectIdProjection> findByIdInAndComplexityOrderByText(Collection<ObjectId> ids, QuestionComplexity complexity);
    List<Question> findByIdInOrderByText(Collection<ObjectId> ids);
}