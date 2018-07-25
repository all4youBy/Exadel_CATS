package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.TaskRepository;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.SolutionChecker;
import com.exadel.team3.backend.services.SolutionCheckerRoutine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
class SolutionCheckerImpl implements SolutionChecker {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private SolutionCheckerRoutine checker;

    @Override
    public int check(@NonNull Solution solution) {
        Optional<Task> task = taskRepository.findById(solution.getTaskId());
        if (!task.isPresent()) {
            throw new ServiceException("Could not verify solution: there's no task with id " +
                    solution.getId());
        }
        Task taskObj = task.get();
        if (taskObj.getType() == TaskTestingType.PASS_ALL) {
            return taskObj.getTestingSets().stream()
                    .allMatch(
                        testingSet ->
                        checker.check(solution, testingSet.getInput(), testingSet.getOutput())
                    )
                        ? 10
                        : 0;
        } else {
            int maxScore = taskObj.getTestingSets()
                    .stream()
                    .mapToInt(TaskTestingSet::getDifficultyLevel)
                    .sum();
            int currentScore = taskObj.getTestingSets()
                    .stream()
                    .filter(
                        testingSet ->
                        checker.check(solution, testingSet.getInput(), testingSet.getOutput())
                    )
                    .mapToInt(TaskTestingSet::getDifficultyLevel)
                    .sum();
            return (int) Math.floor((double) currentScore / maxScore * 10);
        }

    }

    @Bean
    private SolutionCheckerRoutine getStubCheckerRoutine() {
        return ((solution, input, output) -> Math.random()>0.5);
    }
}
