package com.exadel.team3.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityDTO {
    private LocalDateTime time;

    private ActivityType type;

    private String firstName;

    private String lastName;

    private String text;
}
