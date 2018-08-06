package com.exadel.team3.backend.dao.projections;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class TopicProjection {
    @Id
    private final ObjectId id;
    private final String text;
}
