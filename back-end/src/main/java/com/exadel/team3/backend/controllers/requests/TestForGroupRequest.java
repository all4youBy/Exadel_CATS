package com.exadel.team3.backend.controllers.requests;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
public class TestForGroupRequest {

    @NonNull
    private String group;
    @NonNull
    private String title;
    private LocalDateTime start;
    private LocalDateTime deadline;
    private Collection<ObjectId> topicsId;
    private int questionsCount;
    @NonNull
    private String assignedBy;
}
