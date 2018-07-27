package com.exadel.team3.backend.dao.impl;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
class StringIdProjectionObject {
    @Id
    private final String string;
}
