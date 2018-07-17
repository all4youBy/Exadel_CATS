package com.exadel.team3.backend.services.task.task_run.impl;

import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Component
public class TaskRunnerImpl implements TaskRunner {
    @Override
    public boolean runTask(List<File> fileList) {
        return false;
    }
}
