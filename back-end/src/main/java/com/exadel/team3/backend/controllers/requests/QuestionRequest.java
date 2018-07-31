package com.exadel.team3.backend.controllers.requests;

import com.exadel.team3.backend.entities.QuestionComplexity;
import com.exadel.team3.backend.entities.QuestionType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class QuestionRequest{

    @Setter
    @Getter
    private String author;

    @Setter
    @Getter
    private QuestionComplexity complexity;

    @Setter
    @Getter
    private String text;

    @Setter
    @Getter
    private List<String> topicText;

    @Setter
    @Getter
    private boolean training;

    @Setter
    @Getter
    private QuestionType type;
}
