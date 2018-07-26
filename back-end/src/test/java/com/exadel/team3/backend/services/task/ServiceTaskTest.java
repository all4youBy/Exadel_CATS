package com.exadel.team3.backend.services.task;

import com.exadel.team3.backend.services.task.editor.FileEditor;
import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import com.exadel.team3.backend.services.task.task_compile.impl.TaskCompilerImpl;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import com.exadel.team3.backend.services.task.task_run.impl.TaskRunnerImpl;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class ServiceTaskTest {
    @Test
    public void test_task() {
        try {
            List<String> fileNames = new ArrayList<>();
            fileNames.add("SampleClass.java");
            fileNames.add("SampleClassExt.java");
            fileNames.add("SampleClassExt2.java");


            Map<String, String> map = new HashMap<>();

            for (String fileName : fileNames) {
                InputStreamReader inputStreamReader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream("SampleClass.java"));
                BufferedReader bufRead = new BufferedReader(inputStreamReader);
                StringBuilder builder = new StringBuilder();
                String line = null;
                while((line = bufRead.readLine())!= null){
                    builder.append(line).append("\n");
                }
                map.put(fileName.replace(".java", ""), builder.toString());
            }

            ApplicationContext context = new AnnotationConfigApplicationContext(TaskCompilerImpl.class);
            TaskCompiler taskCompiler = context.getBean(TaskCompilerImpl.class);


            List<Class<?>> classList = taskCompiler.compileTask(map);

            ApplicationContext context2 = new AnnotationConfigApplicationContext(TaskRunnerImpl.class);
            TaskRunner taskRunner = context2.getBean(TaskRunnerImpl.class);

            String[] arr = {"arr"};
            Assert.assertEquals("ARR",taskRunner.runTask(classList, arr));

        } catch (Exception ex) {
            ex.getMessage();
        }
    }
}
