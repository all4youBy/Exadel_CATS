package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.NonNull;

import org.bson.types.ObjectId;
import org.springframework.util.StringUtils;

@Data
public class TestAnswer {
    @NonNull
    private ObjectId questionId;

    private String answerData;

    private TestAnswerStatus status;

    public TestAnswerStatus getStatus() {
        if (StringUtils.isEmpty(answerData)) return TestAnswerStatus.UNANSWERED;
        if (status == null) return TestAnswerStatus.UNCHECKED;
        return status;
    }
}
