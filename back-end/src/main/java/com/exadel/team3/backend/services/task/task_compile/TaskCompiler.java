package com.exadel.team3.backend.services.task.task_compile;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface TaskCompiler {
    List<Class<?>> compileTask(List<File> fileList) throws IOException, ClassNotFoundException;
    boolean deleteClasses();
}
