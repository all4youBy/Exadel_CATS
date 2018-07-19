package com.exadel.team3.backend.entities;

import lombok.*;

import org.bson.types.ObjectId;

@Data
@RequiredArgsConstructor
public class TestItem {
    @NonNull
    @Setter(AccessLevel.PRIVATE)
    private ObjectId questionId;

    private TestItemStatus status = TestItemStatus.UNANSWERED;

    private String answer;

   /* public TestItemStatus getStatus() {
        if (CollectionUtils.isEmpty(answers)) return TestItemStatus.UNANSWERED;
        if (status == null) return TestItemStatus.UNCHECKED;
        return status;
    }*/
}
