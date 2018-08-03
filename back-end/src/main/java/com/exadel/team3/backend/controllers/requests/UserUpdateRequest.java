package com.exadel.team3.backend.controllers.requests;

import com.exadel.team3.backend.entities.UserAffiliation;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserUpdateRequest {

    private String email;
    private String firstName;
    private String lastName;
    private UserAffiliation userAffiliation;
}
