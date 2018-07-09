package com.exadel.team3.backend.entities;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

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
    private List<String> groups = new ArrayList<>();

    private UserEducation education;

    private String emailConfirmationCode;
    public boolean isEmailConfirmed() {
        return "confirmed".equals(emailConfirmationCode);
    }
}
