package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.TaskRepository;
import com.exadel.team3.backend.dao.TaggableRepository;
import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;


@Service
@Primary
public class TaskServiceImpl
        extends TaggableServiceImpl<Task>
        implements TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Override
    protected TaggableRepository<Task> getRepository() {
        return taskRepository;
    }
}
