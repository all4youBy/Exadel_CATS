package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.entities.Solution;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

public interface SolutionService extends AssignableService<Solution> {
    Task assignSolutionToUser(
            ObjectId taskId,
            String userId,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    );
    List<Task> assignSolutionToGroup(
            ObjectId taskId,
            String group,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    );
}
