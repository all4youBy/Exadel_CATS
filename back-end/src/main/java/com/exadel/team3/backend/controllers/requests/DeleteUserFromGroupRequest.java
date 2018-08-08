package com.exadel.team3.backend.controllers.requests;

import lombok.Getter;
import lombok.Setter;

public class DeleteUserFromGroupRequest {

    @Setter
    @Getter
    private String userId;

    @Setter
    @Getter
    private String group;
}
