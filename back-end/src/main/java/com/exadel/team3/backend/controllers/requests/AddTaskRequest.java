package com.exadel.team3.backend.controllers.requests;

import com.exadel.team3.backend.entities.TaskTestingSet;
import com.exadel.team3.backend.entities.TaskTestingType;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.util.List;

@Data
public class AddTaskRequest {
    @NonNull
    private String title;
    @NonNull
    private String text;
    @NonNull
    private String author;
    @NonNull
    private TaskTestingType type;
    private List<ObjectId> topicIds;
    private List<TaskTestingSet> testingSets;
}
