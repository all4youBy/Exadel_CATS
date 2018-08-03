package com.exadel.team3.backend.controllers.requests;

import lombok.Getter;
import lombok.Setter;

public class ChangePasswordRequest {

    @Setter
    @Getter
    private String email;

    @Setter
    @Getter
    private String oldPassword;

    @Setter
    @Getter
    private String newPassword;
}
