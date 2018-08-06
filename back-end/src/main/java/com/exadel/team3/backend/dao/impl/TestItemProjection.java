package com.exadel.team3.backend.dao.impl;

import com.exadel.team3.backend.entities.TestItemStatus;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class TestItemProjection {
    @Id
    private final ObjectId id;
    private final ObjectId questionId;
    private final String text;
    private final String answer;
    private final TestItemStatus status;
}
