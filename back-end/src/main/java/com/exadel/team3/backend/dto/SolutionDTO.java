package com.exadel.team3.backend.dto;

import com.exadel.team3.backend.entities.Solution;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@AllArgsConstructor
public class SolutionDTO {
    @NonNull
    private Solution solution;

    @NonNull
    private String title;

    private List<String> topics;
}
