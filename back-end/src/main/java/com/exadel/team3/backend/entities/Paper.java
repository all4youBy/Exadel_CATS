package com.exadel.team3.backend.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
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
    private ObjectId id;

    private String title;

    private String text;

    private List<ObjectId> topicIds;
}
