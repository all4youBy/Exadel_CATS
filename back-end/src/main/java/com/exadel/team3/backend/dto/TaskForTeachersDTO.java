package com.exadel.team3.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@AllArgsConstructor
public class TaskForTeachersDTO {
    @NonNull
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
}
