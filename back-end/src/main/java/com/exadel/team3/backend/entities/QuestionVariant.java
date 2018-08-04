package com.exadel.team3.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuestionVariant {
    @NonNull
    private String text;
    @JsonIgnore
    private boolean correct;
}
