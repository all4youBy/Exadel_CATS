package com.exadel.team3.backend.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "topics")
public class Topic {
    @Setter(AccessLevel.NONE)
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NonNull
    private String text;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId parentId;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private List<Topic> parentHierarchy;
}
