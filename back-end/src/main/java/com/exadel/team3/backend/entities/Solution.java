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
@Document(collection = "solutions")
public class Solution implements Assignable {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NonNull
    @JsonSerialize(using = ToStringSerializer.class)
    private final ObjectId taskId;

    @NonNull
    private String assignedTo;

    private List<String> files;

    private String assignedBy;

    private LocalDateTime start;

    private LocalDateTime deadline;

    private Integer mark;
}