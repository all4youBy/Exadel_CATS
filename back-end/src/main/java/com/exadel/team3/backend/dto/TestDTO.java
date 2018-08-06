package com.exadel.team3.backend.dto;

import com.exadel.team3.backend.entities.Question;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;

public class TestDTO {

    @Setter
    @Getter
    private Collection<Question> questions;

    @Getter
    @Setter
    private String title;

    @Setter
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd  HH:mm:ss")
    private LocalDateTime start;

    @Setter
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd  HH:mm:ss")
    private LocalDateTime deadline;

}
