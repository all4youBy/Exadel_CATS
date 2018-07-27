package com.exadel.team3.backend.entities;

import java.util.List;

import lombok.AccessLevel;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.NonNull;

@Data
@Document(collection = "tasks")
public class Task implements Taggable {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NonNull
    private String title;

    @NonNull
    private String text;

    @NonNull
    private String author;

    @NonNull
    private TaskTestingType type;

    private List<ObjectId> topicIds;

    private List<TaskTestingSet> testingSets;
}
