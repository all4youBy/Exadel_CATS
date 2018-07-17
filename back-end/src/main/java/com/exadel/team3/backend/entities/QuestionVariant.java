package com.exadel.team3.backend.entities;

import lombok.*;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuestionVariant {
    @NonNull
    private String text;

    @NonNull
    private boolean correct;

}
