package com.exadel.team3.backend.dto;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;

import com.exadel.team3.backend.entities.TestItemStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestItemDTO {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId testId;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId questionId;

    private String answer;

    private TestItemStatus status;

    private String questionText;

}
