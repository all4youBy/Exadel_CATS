package com.exadel.team3.backend.controllers.requests;

import com.exadel.team3.backend.entities.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

public class RegistrationRequest{

    @NonNull
    @Setter
    @Getter
    private String firstName;

    @NonNull
    @Setter
    @Getter
    private String secondName;

    @NonNull
    @Setter
    @Getter
    private String email;

    @Setter
    @Getter
    private String institution;

    @JsonProperty("role")
    @Setter
    @Getter
    private UserRole userRole;

    @Setter
    @Getter
    private String faculty;

    @Setter
    @Getter
    private String job;

    @Setter
    @Getter
    private String primarySkill;

    @Setter
    @Getter
    private int yearTermination;
}
