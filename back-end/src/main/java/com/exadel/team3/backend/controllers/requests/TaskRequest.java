package com.exadel.team3.backend.controllers.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
public class TaskRequest {

    @NonNull
    private String assignedTo;

    @NonNull
    private ObjectId id;

    @NonNull
    private String title;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime start;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime deadline;

    private Collection<ObjectId> topicsId;
    @NonNull
    private String assignedBy;
}
