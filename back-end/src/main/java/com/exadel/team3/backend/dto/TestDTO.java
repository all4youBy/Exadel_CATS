package com.exadel.team3.backend.dto;

import com.exadel.team3.backend.entities.Question;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.util.Collection;

public class TestDTO {

    @Setter
    @Getter
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId testId;

    @Setter
    @Getter
    private Collection<Question> testQuestions;


}
