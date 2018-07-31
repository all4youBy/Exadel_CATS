package com.exadel.team3.backend.controllers.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

@Data
public class TrainingTestGenerationRequest {

    @NonNull
    @JsonProperty("email")
    private String userId;
    private ObjectId topicId;
}
