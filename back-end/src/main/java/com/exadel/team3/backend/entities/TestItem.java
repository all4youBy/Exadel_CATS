package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.NonNull;

import org.bson.types.ObjectId;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Data
public class TestItem {
    @NonNull
    private ObjectId questionId;

    private String questionText;

    private TestItemStatus status;

    private List<String> answers;

    public TestItemStatus getStatus() {
        if (CollectionUtils.isEmpty(answers)) return TestItemStatus.UNANSWERED;
        if (status == null) return TestItemStatus.UNCHECKED;
        return status;
    }
}
