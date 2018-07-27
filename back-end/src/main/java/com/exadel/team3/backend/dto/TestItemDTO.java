package com.exadel.team3.backend.dto;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.util.StringUtils;

import com.exadel.team3.backend.entities.TestItem;
import com.exadel.team3.backend.entities.TestItemStatus;

public class TestItemDTO extends TestItem {
    @NonNull
    @Getter
    private ObjectId testId;

    public TestItemDTO(ObjectId testId, ObjectId questionId) {
        this(
                testId,
                questionId,
                null,
                TestItemStatus.UNANSWERED
        );
    }
    public TestItemDTO(ObjectId testId, ObjectId questionId, String answer) {
        this(
                testId,
                questionId,
                answer,
                StringUtils.isEmpty(answer) ? TestItemStatus.UNANSWERED : TestItemStatus.UNCHECKED
        );
    }
    public TestItemDTO(ObjectId testId, ObjectId questionId, String answer, TestItemStatus status) {
        super(questionId);
        this.testId = testId;
        this.setAnswer(answer);
    }
}
