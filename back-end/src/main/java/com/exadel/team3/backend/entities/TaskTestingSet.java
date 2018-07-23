package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.NonNull;

@Data
public class TaskTestingSet {
    private static int MIN_DIFFICULTY_LEVEL = 1;
    private static int MAX_DIFFICULTY_LEVEL = 10;
    private static int DEFAULT_DIFFICULTY_LEVEL = 5;

    @NonNull
    private String input;

    @NonNull
    private String output;

    private int difficultyLevel = DEFAULT_DIFFICULTY_LEVEL;
    public void setDifficultyLevel(int value) {
        difficultyLevel = value < MIN_DIFFICULTY_LEVEL
                            ? MIN_DIFFICULTY_LEVEL
                            : value > MAX_DIFFICULTY_LEVEL
                                ? MAX_DIFFICULTY_LEVEL
                                : value;
    }
}
