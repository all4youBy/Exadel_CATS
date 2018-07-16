package com.exadel.team3.backend.entities;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "topics")
public class Topic {
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NonNull
    private String text;

    private ObjectId parentId;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private List<Topic> parentHierarchy;
}
