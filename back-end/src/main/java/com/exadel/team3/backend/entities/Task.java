package com.exadel.team3.backend.entities;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "tasks")
public class Task implements Taggable {
    @Id
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NonNull
    private String title;

    @NonNull
    private String text;

    @NonNull
    private String author;

    @NonNull
    private TaskTestingType type = TaskTestingType.PASS_ALL;

    private List<ObjectId> topicIds;

    private List<TaskTestingSet> testingSets;
}
