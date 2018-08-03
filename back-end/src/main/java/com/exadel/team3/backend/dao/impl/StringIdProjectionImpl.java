package com.exadel.team3.backend.dao.impl;

import lombok.Data;
import org.springframework.data.annotation.Id;
import com.exadel.team3.backend.dao.StringIdProjection;

@Data
class StringIdProjectionImpl implements StringIdProjection {
    @Id
    private final String id;
}
