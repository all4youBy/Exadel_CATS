package com.exadel.team3.backend.entities;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;

import java.util.List;

@Data
@Document(collection="questions")
public class Question {
    @Setter(AccessLevel.NONE)
    private String id;

    @NonNull
    private QuestionType type;

    @NonNull
    private String text;

    @NonNull
    private QuestionComplexity complexity;

    @NonNull
    private String author;

    private List<Answer> answers;

    private List<String> topicIds;

    private boolean isTraining;

    private QuestionStatus status = QuestionStatus.ACTIVE;

    private QuestionStatistics statistics;
}

