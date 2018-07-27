package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.SolutionCheckerRoutine;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.task.editor.FileEditor;
import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ExecutorImpl {
    @Autowired
    TaskCompiler taskCompiler;

    @Autowired
    TaskRunner taskRunner;

    @Autowired
    SolutionService solutionService;

    private Solution solution;
    private Method method;

    @Bean
    public SolutionCheckerRoutine getStubCheckerRoutine() throws ServiceException {
        return ((solution, input, output) -> {
            if (this.solution == null) {
                this.solution = solution;
                this.method = getMethod(solution);
            }

            String answer = taskRunner.runTask(method, input.split("\n"));
            return answer.equals(output);
        });
    }

    private Method getMethod(Solution solution) throws ServiceException {
        Method method;
        List<String> filenames = solution.getFiles();
        Map<String, String> nameAndContentFiles = new HashMap<>();

        try {
            for (String fileName : filenames) {
                InputStream inputStream = solutionService.getFile(solution, fileName);
                nameAndContentFiles.put(fileName, FileEditor.getFile(inputStream));
            }
            nameAndContentFiles = FileEditor.editFiles(nameAndContentFiles);
            method = taskRunner.findMethod(taskCompiler.compileTask(nameAndContentFiles), "executor", new String[]{});
        } catch (IOException e) {
            throw new ServiceException(e);
        }

        return method;
    }
}
