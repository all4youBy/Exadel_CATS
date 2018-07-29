package com.exadel.team3.backend.entities;

import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
@Document(collection="questions")
public class Question implements Taggable {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
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

