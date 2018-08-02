package com.exadel.team3.backend.dto;

import com.exadel.team3.backend.entities.Solution;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@AllArgsConstructor
public class SolutionDTO {
    @NonNull
    Solution solution;

    @NonNull
    private String title;

    private List<String> topics;
}
