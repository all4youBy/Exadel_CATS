package com.exadel.team3.backend.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
@AllArgsConstructor
public class SolutionJsonDTO {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NonNull
    @JsonSerialize(using = ToStringSerializer.class)
    private final ObjectId taskId;

    @NonNull
    private String assignedTo;

    private Collection<String> files;

    private String assignedBy;

    private LocalDateTime start;

    private LocalDateTime deadline;

    private Integer mark;
}
