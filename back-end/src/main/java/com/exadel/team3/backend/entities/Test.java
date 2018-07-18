package com.exadel.team3.backend.entities;

import lombok.*;
import org.apache.tomcat.jni.Local;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "tests")
public class Test {
    @Id
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NonNull
    private String assignedTo;

    @NonNull
    private String title;

    @NonNull
    private LocalDateTime start;

    @NonNull
    private LocalDateTime deadline;

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
