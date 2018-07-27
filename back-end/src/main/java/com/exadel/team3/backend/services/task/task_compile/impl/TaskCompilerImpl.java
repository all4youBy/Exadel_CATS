package com.exadel.team3.backend.services.task.task_compile.impl;

import com.exadel.team3.backend.services.task.task_compile.TaskCompileException;
import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import org.mdkt.compiler.InMemoryJavaCompiler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class TaskCompilerImpl implements TaskCompiler {
    private List<Class<?>> classList = new ArrayList<>();

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public List<Class<?>> compileTask(Map<String, String> fileMap) throws TaskCompileException {
        Map<String, Class<?>> stringClassMap = null;
        InMemoryJavaCompiler inMemoryJavaCompiler = InMemoryJavaCompiler.newInstance();
        for (Map.Entry<String, String> fileEntry : fileMap.entrySet()) {
            try {
                inMemoryJavaCompiler.ignoreWarnings().addSource(fileEntry.getKey(), fileEntry.getValue());
            } catch (Exception ex) {
                logger.error("Can't add users files. " + ex.getMessage());
                throw new TaskCompileException(ex);
            }
        }

        try {
            stringClassMap = inMemoryJavaCompiler.ignoreWarnings().compileAll();
        } catch (Exception ex) {
            logger.error("Can't compile users files. " + ex.getMessage());
            throw new TaskCompileException(ex);
        }

        for (Map.Entry<String, Class<?>> entry : stringClassMap.entrySet()) {
            classList.add(entry.getValue());
        }
        return classList;
    }
}
