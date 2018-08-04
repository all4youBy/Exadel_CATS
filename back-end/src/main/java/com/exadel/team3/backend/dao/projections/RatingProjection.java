package com.exadel.team3.backend.dao.projections;

import org.springframework.data.annotation.Id;
import lombok.Data;

@Data
public class RatingProjection implements com.exadel.team3.backend.dao.RatingProjection {
    @Id
    private final String id;
    private final String firstName;
    private final String lastName;
    private final int rating;
}
