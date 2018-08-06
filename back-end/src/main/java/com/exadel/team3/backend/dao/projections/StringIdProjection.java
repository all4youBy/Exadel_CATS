package com.exadel.team3.backend.dao.projections;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class StringIdProjection {
    @Id
    private final String id;
}
