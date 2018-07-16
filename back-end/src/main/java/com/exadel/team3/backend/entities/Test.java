package com.exadel.team3.backend.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "tests")
public class Test {
    @Value("${cats.test.defaultDuration")
    private static long defaultTestDuration;

    @NonNull
    private String assignedTo;

    @NonNull
    private String title;

    @NonNull
    private LocalDateTime startingDate = LocalDateTime.now();

    private String assignedBy;

    @EqualsAndHashCode.Exclude
    private int mark;

    private List<TestAnswer> answers;

    private Duration duration = Duration.ofMinutes(defaultTestDuration);

    public LocalDateTime getDeadline() {
        return  startingDate.plus(duration);
    }

}
