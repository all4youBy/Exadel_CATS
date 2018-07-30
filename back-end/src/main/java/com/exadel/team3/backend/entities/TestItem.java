package com.exadel.team3.backend.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import org.bson.types.ObjectId;

@Data
public class TestItem {
    @NonNull
    @JsonSerialize(using = ToStringSerializer.class)
    @Setter(AccessLevel.NONE)
    private ObjectId questionId;

    private TestItemStatus status = TestItemStatus.UNANSWERED;

    private String answer;

   /* public TestItemStatus getStatus() {
        if (CollectionUtils.isEmpty(answers)) return TestItemStatus.UNANSWERED;
        if (status == null) return TestItemStatus.UNCHECKED;
        return status;
    }*/
}
