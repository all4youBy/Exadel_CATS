package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.AssignableRepository;
import com.exadel.team3.backend.dao.SolutionRepository;
import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.services.SolutionService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

public class SolutionServiceImpl
        extends AssignableServiceImpl<Solution>
        implements SolutionService
{
    @Autowired
    private SolutionRepository solutionRepository;

    @Override
    protected AssignableRepository<Solution> getRepository() {
        return null;
    }

    @Override
    public Task assignSolutionToUser(
            ObjectId taskId,
            String userId,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    ) {
        return null;
    }

    @Override
    public List<Task> assignSolutionToGroup(
            ObjectId taskId,
            String group,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    ) {
        return null;
    }


}
