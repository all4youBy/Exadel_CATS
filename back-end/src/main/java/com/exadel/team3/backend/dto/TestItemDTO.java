package com.exadel.team3.backend.dto;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;

import com.exadel.team3.backend.entities.TestItemStatus;

@Data
@AllArgsConstructor
public class TestItemDTO {

    @JsonSerialize(using = ToStringSerializer.class)
    private final ObjectId testId;
    @JsonSerialize(using = ToStringSerializer.class)
    private final ObjectId questionId;

    private final String answer;

    private final TestItemStatus status;

    private String questionText;

}
