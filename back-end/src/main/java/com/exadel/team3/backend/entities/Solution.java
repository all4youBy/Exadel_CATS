package com.exadel.team3.backend.entities;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "solutions")
public class Solution implements Assignable {
    @Id
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NonNull
    private String assignedTo;

    @NonNull
    private final ObjectId taskId;

    private String assignedBy;
    private LocalDateTime start;
    private LocalDateTime deadline;
    private Integer mark;
}
