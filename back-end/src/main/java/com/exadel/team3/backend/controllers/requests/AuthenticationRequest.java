package com.exadel.team3.backend.controllers.requests;

import lombok.Data;
import lombok.NonNull;

@Data
public class AuthenticationRequest {

    @NonNull
    private String username;
    @NonNull
    private String password;
}
