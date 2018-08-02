package com.exadel.team3.backend.dao;

import org.springframework.stereotype.Repository;

import com.exadel.team3.backend.entities.Task;

public interface TaskRepository extends TaggableRepository<Task> {
}