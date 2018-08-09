package com.exadel.team3.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class TaskForTeachersDTO {
    @NonNull
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NonNull
    private String title;

    private List<String> topics;

    @NonNull
    private final String email;

    @NonNull
    private String firstName;

    @NonNull
    private String lastName;

    private LocalDateTime dateCreation;

}
