package com.exadel.team3.backend.controllers.requests;

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
    private LocalDateTime start;
    private LocalDateTime deadline;
    private Collection<ObjectId> topicsId;
    @NonNull
    private String assignedBy;
}
