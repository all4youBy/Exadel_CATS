package com.exadel.team3.backend.services.task.task_compile;

import java.io.File;
import java.util.List;

public interface TaskCompiler {
    boolean compileTask(List<File> fileList);
}
