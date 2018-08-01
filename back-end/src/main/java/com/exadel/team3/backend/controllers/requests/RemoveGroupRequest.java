package com.exadel.team3.backend.controllers.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Collection;

public class RemoveGroupRequest {

    @NonNull
    @Setter
    @Getter
    @JsonProperty("usersId")
    private Collection<String> userId;

    @NonNull
    @Setter
    @Getter
    private String group;
}
