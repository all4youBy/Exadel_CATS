package com.exadel.team3.backend.entities;

import lombok.*;

@Data
@RequiredArgsConstructor
public class Answer {

    @NonNull
    public String text;

    @NonNull
    public boolean isRight;

}
