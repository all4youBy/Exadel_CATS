package com.exadel.team3.backend.dto.mappers;

import com.exadel.team3.backend.dto.SolutionDTO;
import com.exadel.team3.backend.dto.SolutionForTeachersTDO;
import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class SolutionDTOMapper {
    @Autowired
    SolutionService solutionService;
    @Autowired
    TaskService taskService;
    @Autowired
    TopicDTOMapper topicDTOMapper;

    public List<SolutionDTO> convertToDTO(List<Solution> solutions){
        List<SolutionDTO> solutionDTO = new ArrayList<>();

        for (Solution solution : solutions) {
            Task task = taskService.getItem(solution.getTaskId());
            solutionDTO.add(new SolutionDTO(solution, task.getTitle(), topicDTOMapper.transformInToList(task.getTopicIds())));
        }
        return solutionDTO;
    }

    public List<SolutionForTeachersTDO> convertToSolutionForTeachersTDO(List<Solution> solutions) {
        List<SolutionForTeachersTDO> list = new ArrayList<>();
        for (Solution solution : solutions) {
            Task task = taskService.getItem(solution.getId());
            SolutionForTeachersTDO sol = new SolutionForTeachersTDO(
                    solution.getTaskId(), solution.getAssignedTo(),
                    solution.getStart(), solution.getDeadline(), solution.getMark() == null ? 0 : solution.getMark(),
                    task.getTitle(), topicDTOMapper.transformInToList(task.getTopicIds()));
            list.add(sol);
        }
        return list;
    }
}
