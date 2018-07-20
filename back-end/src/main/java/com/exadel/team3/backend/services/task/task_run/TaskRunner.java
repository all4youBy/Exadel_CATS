package com.exadel.team3.backend.services.task.task_run;

import java.util.List;

public interface TaskRunner {
    boolean runTask(List<Class<?>> classList, String... args);
}
