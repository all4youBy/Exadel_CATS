package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "tests")
public class Test {
    @NonNull
    private String assignedTo;

    @NonNull
    private String title;

    @NonNull
    private LocalDateTime start;

    @NonNull
    private Duration duration;

    public LocalDateTime getDeadline() {
        return  start.plus(duration);
    }

    private String assignedBy;
    /*
    public boolean isTraining() {
        return StringUtils.isEmpty(assignedBy);
    }
    */

    private List<TestItem> items;

    @EqualsAndHashCode.Exclude
    private int mark;
}
