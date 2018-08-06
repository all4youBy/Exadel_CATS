package com.exadel.team3.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class UserRatingDTO {
    @NonNull
    private String firstName;

    @NonNull
    private String lastName;

    private int rating;
}
