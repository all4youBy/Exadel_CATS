package com.exadel.team3.backend.entities;

import lombok.*;

@Data
@RequiredArgsConstructor
public class Answer {

    @NonNull
    private String text;

    @NonNull
    private boolean isRight;

}
