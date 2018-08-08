package com.exadel.team3.backend.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.NonNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection="papers")
public class Paper implements Taggable {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    @Setter(AccessLevel.NONE)
    private String id;

    @NonNull
    private String title;

    @NonNull
    private String text;

    @NonNull
    private String author;

    private List<ObjectId> topicIds;
}
