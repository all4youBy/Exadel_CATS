package com.exadel.team3.backend.dto;

import com.exadel.team3.backend.entities.Solution;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class TaskDTO {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NonNull
    Solution solution;

    @NonNull
    private String title;

    @NonNull
    private String text;

    private List<ObjectId> topicIds;

}
