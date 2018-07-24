package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.AssignableRepository;
import com.exadel.team3.backend.dao.SolutionRepository;
import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.services.SolutionService;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolutionServiceImpl
        extends AssignableServiceImpl<Solution>
        implements SolutionService
{
    @Autowired
    private SolutionRepository solutionRepository;
    @Autowired
    private Environment env;

    @Override
    protected AssignableRepository<Solution> getRepository() {
        return solutionRepository;
    }

    @Override
    public Solution assignSolutionToUser(
            @NonNull ObjectId taskId,
            @NonNull String userId,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    ) {
        Solution newSolution = new Solution(userId, taskId);
        start = start != null ? start :LocalDateTime.now();
        deadline = deadline != null && deadline.isAfter(start)
                ? deadline
                : start.plus(Duration.ofMinutes(
                Long.parseLong(env.getProperty("cats.task.defaultDuration", "120"))
        ));
        newSolution.setStart(start);
        newSolution.setDeadline(deadline);
        newSolution.setAssignedBy(assignedBy);
        return addItem(newSolution);
    }

    @Override
    public List<Solution> assignSolutionToGroup(
            @NonNull ObjectId taskId,
            @NonNull String group,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    ) {
        return getUserIdsByGroupNameStream(group)
                .map(
                      userId ->
                        assignSolutionToUser(taskId, userId, start, deadline, assignedBy)
                )
                .collect(Collectors.toList());
    }


}
