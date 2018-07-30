package com.exadel.team3.backend.controllers.requests;

import com.exadel.team3.backend.entities.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

public class UpdateUserRightsRequest {

    @NonNull
    @Setter
    @Getter
    @JsonProperty("email")
    private String email;

    @NonNull
    @Setter
    @Getter
    @JsonProperty("role")
    private UserRole userRole;
}
