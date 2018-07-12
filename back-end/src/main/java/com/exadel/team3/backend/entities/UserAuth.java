package com.exadel.team3.backend.entities;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Data
public class UserAuth {
    @NonNull
    private UserRole role;

    @NonNull
    private String passwordHash;
}
