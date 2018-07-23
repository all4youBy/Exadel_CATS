package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Task;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskService extends TaggableService<Task> {
}
