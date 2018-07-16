package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;

@Data
public class QuestionStatistics {
    private int useCount;
    private int rightAnswersCount;
/*
    public QuestionComplexity getRatedComplexity(@NonNull QuestionComplexity defaultComplexity) {
        if (useCount <= complexityRedefineThreshold) return defaultComplexity;
        double rightAnswersRatio = rightAnswersCount / useCount;

        if (rightAnswersRatio > 0.75)  return QuestionComplexity.LEVEL_1;
        if (rightAnswersRatio > 0.5) return QuestionComplexity.LEVEL_2;
        if (rightAnswersRatio > 0.25) return QuestionComplexity.LEVEL_3;
        return QuestionComplexity.LEVEL_4;
    }*/
}
