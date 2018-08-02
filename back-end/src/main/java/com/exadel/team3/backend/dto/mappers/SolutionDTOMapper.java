package com.exadel.team3.backend.dto.mappers;

import com.exadel.team3.backend.dto.SolutionDTO;
import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class SolutionDTOMapper {
    @Autowired
    SolutionService solutionService;
    @Autowired
    TaskService taskService;

    public List<SolutionDTO> convertToDTO(List<Solution> solutions){
        List<SolutionDTO> solutionDTO = new ArrayList<>();

        for (Solution solution : solutions) {
            Task task = taskService.getItem(solution.getTaskId());
            solutionDTO.add(new SolutionDTO(solution, task.getTitle(), task.getTopicIds()));
        }
        return solutionDTO;
    }
}
