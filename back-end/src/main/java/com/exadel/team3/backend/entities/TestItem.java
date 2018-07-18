package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.NonNull;

import org.bson.types.ObjectId;
import org.springframework.util.StringUtils;

@Data
public class TestItem {
    @NonNull
    private ObjectId questionId;

    private String answerData;

    private TestItemStatus status;

    public TestItemStatus getStatus() {
        if (StringUtils.isEmpty(answerData)) return TestItemStatus.UNANSWERED;
        if (status == null) return TestItemStatus.UNCHECKED;
        return status;
    }
}
