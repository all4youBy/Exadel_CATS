package com.exadel.team3.backend.dao.projections;

import com.exadel.team3.backend.entities.QuestionComplexity;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class QuestionAssessmentProjection {
    @Id
    private ObjectId questionId;
    private QuestionComplexity complexity;
    private int right;
    private int wrong;
    private int total;
}
