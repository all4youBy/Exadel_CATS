package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@Document(collection = "topics")
public class Topic {
    @Id
    @EqualsAndHashCode.Exclude
    private String id = new ObjectId().toString();

    @NonNull
    private String text;

    @EqualsAndHashCode.Exclude
    private Set<Topic> topics;
}
