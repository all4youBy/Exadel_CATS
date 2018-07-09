package com.exadel.team3.backend.entities;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class User {
    @Id
    @NonNull
    @Setter(AccessLevel.NONE)
    private String email;

    @NonNull
    private String firstName;

    @NonNull
    private String lastName;

    @NonNull
    private UserRole role;

    @NonNull
    private String passwordHash;

    @Setter(AccessLevel.NONE)
    private Set<String> groups = new HashSet<>();

    private UserEducation education;

    private String emailConfirmationCode;
    public boolean isEmailConfirmed() {
        return StringUtils.isEmpty(emailConfirmationCode);
    }
}
