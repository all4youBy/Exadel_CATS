package com.exadel.team3.backend.controllers.requests;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

public class RenameGroupRequest {

    @JsonProperty("usersId")
    @Setter
    @Getter
    private Collection<String> usersId;

    @Setter
    @Getter
    private String oldGroup;

    @Setter
    @Getter
    private String newGroup;
}
