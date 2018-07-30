package com.exadel.team3.backend.controllers.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Collection;

@Data
public class TestGenerationRequest {

    @NonNull
    @JsonProperty("email")
    private String userId;
    private String title;

    @JsonFormat
    private LocalDateTime start;

    @JsonFormat
    private LocalDateTime deadline;
    private Collection<ObjectId> topicsId;
    private int questionsCount;
    private String assignedBy;
}
