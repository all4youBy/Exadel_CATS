package com.exadel.team3.backend.services.task.task_compile.impl;

import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Component
public class TaskCompilerImpl implements TaskCompiler {

    @Override
    public boolean compileTask(List<File> fileList) {
        return false;
    }
}
