package com.exadel.team3.backend.dao.impl;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
class StringIdProjectionImpl {
    @Id
    private final String string;
}
