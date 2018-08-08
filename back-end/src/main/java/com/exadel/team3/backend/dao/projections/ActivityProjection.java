package com.exadel.team3.backend.dao.projections;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivityProjection {
    private final String userId;
    private final String firstName;
    private final String lastName;
    private final String assignedBy;
    private final String text;
    private final String title;
    private final LocalDateTime start;
    private final LocalDateTime deadline;
    private final Integer mark;
}
