package com.exadel.team3.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
public class TestPostDTO {

    @Setter
    @Getter
//    @JsonSerialize(using = ToStringSerializer.class)
    private String testId;

    @Setter
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-dd-MM  HH:mm:ss")
    private LocalDateTime start;

    @Setter
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-dd-MM  HH:mm:ss")
    private LocalDateTime deadline;
}
