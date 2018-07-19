package com.exadel.team3.backend.security.requests;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collection;

@Data
public class TestGenerationRequest {

    @NonNull
    private String userId;
    private String title;
    private LocalDateTime start;
    private LocalDateTime deadline;
    private Collection<ObjectId> topicsId;
    private int questionsCount;
    private String assignedBy;
}
