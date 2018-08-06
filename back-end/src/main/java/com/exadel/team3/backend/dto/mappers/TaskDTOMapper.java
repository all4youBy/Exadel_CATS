package com.exadel.team3.backend.dto.mappers;

import com.exadel.team3.backend.dto.TaskForTeachersDTO;
import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TaskService;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TaskDTOMapper {
    @Autowired
    SolutionService solutionService;
    @Autowired
    TaskService taskService;
    @Autowired
    UserService userService;
    @Autowired
    TopicDTOMapper topicDTOMapper;

    public List<TaskForTeachersDTO> convertToTaskForTeachersDTO(List<Task> tasks){
        List<TaskForTeachersDTO> tasksForUserDTO = new ArrayList<>();
        for(Task task : tasks) {
            User user = userService.getItem(task.getAuthor());
            TaskForTeachersDTO taskForTeachersDTO = new TaskForTeachersDTO(task.getId(), task.getTitle(),
                    topicDTOMapper.transformInToList(task.getTopicIds()),
                    task.getAuthor(), user.getFirstName(), user.getLastName(), task.getId().getDate().toString());
            tasksForUserDTO.add(taskForTeachersDTO);
        }

        return tasksForUserDTO;
    }
}
