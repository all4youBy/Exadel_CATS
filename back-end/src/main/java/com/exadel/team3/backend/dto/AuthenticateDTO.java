package com.exadel.team3.backend.dto;


import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.security.SecurityUtils;
import com.exadel.team3.backend.services.time.TimeService;
import lombok.Getter;
import lombok.NonNull;

public class AuthenticateDTO{

    @NonNull
    @Getter
    private String token;

    @NonNull
    @Getter
    private String firstName;

    @NonNull
    @Getter
    private String lastName;

    @NonNull
    @Getter
    private String tokenCreatedTime;

    @NonNull
    @Getter
    private String role;

    public AuthenticateDTO (String token,User user,SecurityUtils securityUtils){
        this(token,
                user.getFirstName(),
                user.getLastName(),
                user.getRole().toString(),
                TimeService.parseDateToLocalDateTime(securityUtils.getTokenCreateTime(token)).toString());
    }

    private AuthenticateDTO(String token,
                            String firstName,
                            String lastName,
                            String role,
                            String tokenCreatedTime){

        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.tokenCreatedTime = tokenCreatedTime;
        this.role = role;
    }
}
