package com.exadel.team3.backend.services.task.task_run;

import java.io.File;
import java.util.List;

public interface TaskRunner {
    boolean runTask(List<File> fileList);
}
