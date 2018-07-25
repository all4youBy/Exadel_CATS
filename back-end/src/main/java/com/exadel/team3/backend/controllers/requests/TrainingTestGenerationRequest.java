package com.exadel.team3.backend.controllers.requests;

import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

@Data
public class TrainingTestGenerationRequest {

    @NonNull
    private String userId;
    private ObjectId topicId;
}
