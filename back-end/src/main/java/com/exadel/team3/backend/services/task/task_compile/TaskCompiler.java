package com.exadel.team3.backend.services.task.task_compile;

import java.io.File;
import java.util.List;

public interface TaskCompiler {
    List<Class<?>> compileTask(List<File> fileList);
    boolean deleteClasses();
}
