package com.exadel.team3.backend.entities;

import org.bson.types.ObjectId;
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
    private ObjectId id;

    @NonNull
    private QuestionType type;

    @NonNull
    private String text;

    @NonNull
    private QuestionComplexity complexity;

    @NonNull
    private String author;

    private List<QuestionVariant> variants;

    private List<ObjectId> topicIds;

    private boolean training;

    private QuestionStatus status = QuestionStatus.ACTIVE;

    private QuestionStatistics statistics;
}

