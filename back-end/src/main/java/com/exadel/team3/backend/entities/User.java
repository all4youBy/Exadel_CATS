package com.exadel.team3.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.Set;

@Data
@Document(collection = "users")
@JsonIgnoreProperties(ignoreUnknown = true)
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

    private UserAffiliation education;

    private String emailConfirmationCode;
    public boolean isEmailConfirmed() {
        return StringUtils.isEmpty(emailConfirmationCode);
    }
}
