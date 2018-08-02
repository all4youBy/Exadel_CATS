package com.exadel.team3.backend.dto;


import lombok.*;
import org.bson.types.ObjectId;

import com.exadel.team3.backend.entities.TestItemStatus;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class TestItemDTO {
    private final ObjectId testId;

    private final ObjectId questionId;

    private final String answer;

    private TestItemStatus status = TestItemStatus.UNANSWERED;
}
