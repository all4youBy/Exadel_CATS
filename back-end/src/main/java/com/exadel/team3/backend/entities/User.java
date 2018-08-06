package com.exadel.team3.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Document(collection = "users")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    @Id
    @NonNull
    private final String email;

    @NonNull
    private String firstName;

    @NonNull
    private String lastName;

    @NonNull
    private UserRole role;

    @NonNull
    @JsonIgnore
    private String passwordHash;

    @Indexed
    @Setter(AccessLevel.NONE)
    private Set<String> groups = new HashSet<>();

    private UserAffiliation affiliation;

    private String emailConfirmationCode;
    public boolean isEmailConfirmed() {
        return StringUtils.isEmpty(emailConfirmationCode);
    }

    private LocalDateTime registrationDate;
}
