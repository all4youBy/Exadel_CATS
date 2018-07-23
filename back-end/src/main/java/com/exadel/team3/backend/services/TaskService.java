package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Task;
import org.springframework.stereotype.Service;

@Service
public interface TaskService extends TaggableService<Task> {
}
