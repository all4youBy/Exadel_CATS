package com.exadel.team3.backend.entities;

import java.time.LocalDateTime;
import java.util.List;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
@Document(collection = "tests")
public class Test implements Assignable {
    @Id
    @Setter(AccessLevel.NONE)
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NonNull
    private String assignedTo;

    @NonNull
    private String title;

    @NonNull
    private LocalDateTime start;

    @NonNull
    private LocalDateTime deadline;

    private String assignedBy;

    private List<TestItem> items;

    @EqualsAndHashCode.Exclude
    private Integer mark;
}
