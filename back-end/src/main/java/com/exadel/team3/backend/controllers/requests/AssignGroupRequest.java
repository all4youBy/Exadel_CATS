package com.exadel.team3.backend.controllers.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
public class AssignGroupRequest {

    @NonNull
    private List<String>emails;

    @JsonProperty("group")
    @NonNull
    private String groupId;
}
