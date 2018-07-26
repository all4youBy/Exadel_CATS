package com.exadel.team3.backend.services.task.task_compile.impl;

import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import org.mdkt.compiler.InMemoryJavaCompiler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class TaskCompilerImpl implements TaskCompiler {
    private List<Class<?>> classList = new ArrayList<>();

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public List<Class<?>> compileTask(Map<String, String> fileMap) {
        Map<String, Class<?>> stringClassMap = null;
        InMemoryJavaCompiler inMemoryJavaCompiler = InMemoryJavaCompiler.newInstance();
        for (Map.Entry<String, String> fileEntry : fileMap.entrySet()) {
            try {
                inMemoryJavaCompiler.ignoreWarnings().addSource(fileEntry.getKey(), fileEntry.getValue());
            } catch (Exception e) {
                //TODO Exception here
                e.printStackTrace();
            }
        }


        try {
            stringClassMap = inMemoryJavaCompiler.ignoreWarnings().compileAll();
        } catch (Exception e) {
            //TODO Exception here
            e.printStackTrace();
        }

        for (Map.Entry<String, Class<?>> entry : stringClassMap.entrySet()) {
            classList.add(entry.getValue());
        }
        return classList;
    }

    public List<Class<?>> getClassList() {
        return classList;
    }
}
