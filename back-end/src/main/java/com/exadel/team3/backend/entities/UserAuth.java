package com.exadel.team3.backend.entities;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserAuth {
    @NonNull
    private UserRole role;

    @NonNull
    private String passwordHash;
}
