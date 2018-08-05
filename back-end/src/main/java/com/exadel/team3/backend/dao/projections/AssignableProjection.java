package com.exadel.team3.backend.dao.projections;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class AssignableProjection {
    @Id
    private final ObjectId id;
    private final String text;
    private final LocalDateTime start;
    private final LocalDateTime deadline;
    private final List<TopicProjection> topics;
}
