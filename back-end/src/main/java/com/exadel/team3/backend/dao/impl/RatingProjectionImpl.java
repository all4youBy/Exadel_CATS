package com.exadel.team3.backend.dao.impl;

import org.springframework.data.annotation.Id;
import lombok.Data;

import com.exadel.team3.backend.dao.RatingProjection;

@Data
public class RatingProjectionImpl implements RatingProjection {
    @Id
    private final String id;
    private final int rating;
}
