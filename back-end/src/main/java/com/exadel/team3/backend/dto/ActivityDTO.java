package com.exadel.team3.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data

public class ActivityDTO {
    private final LocalDateTime time;

    private final ActivityType type;

    private String firstName;

    private String lastName;

}
