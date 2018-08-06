package com.exadel.team3.backend.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class SolutionForTeachersTDO {
    @NonNull
    @JsonSerialize(using = ToStringSerializer.class)
    private final ObjectId taskId;

    private String assignedTo;

    private LocalDateTime start;

    private LocalDateTime deadline;

    private Integer mark;

    @NonNull
    private String title;

    private List<String> topics;
}
