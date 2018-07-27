package com.exadel.team3.backend.services.task.task_compile;

import java.util.List;
import java.util.Map;

public interface TaskCompiler {
    List<Class<?>> compileTask(Map<String, String> fileList) throws TaskCompileException;
}
