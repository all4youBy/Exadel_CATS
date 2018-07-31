package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.services.task.editor.FileEditor;
import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import com.exadel.team3.backend.services.task.task_compile.impl.TaskCompilerImpl;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import com.exadel.team3.backend.services.task.task_run.impl.TaskRunnerImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.*;

@RestController
@RequestMapping("/task")
public class TaskControllerTest {

    @PostMapping("/test/{arg}")
    public ResponseEntity<?> test(@PathVariable(value = "arg") String arg){
        try {

            List<String> fileNames = new ArrayList<>();
            fileNames.add("SampleClass.java");
            fileNames.add("SampleClassExt.java");
            fileNames.add("SampleClassExt2.java");

            List<String> fileText = new ArrayList<>();
            fileText.add("public class SampleClass {\n" +
                    "    public static void main(String[] args) {\n" +
                    "\n" +
                    "    }\n" +
                    "\n" +
                    "    public static String execute(String... args) {\n" +
                    "        SampleClassExt sampleClassExt = new SampleClassExt(args[0]);\n" +
                    "\n" +
                    "        return sampleClassExt.method();\n" +
                    "    }\n" +
                    "}");

            fileText.add("\n" +
                    "\n" +
                    "public class SampleClassExt {\n" +
                    "    private String string;\n" +
                    "\n" +
                    "    public SampleClassExt(String string) {\n" +
                    "        this.string = string;\n" +
                    "    }\n" +
                    "\n" +
                    "    public String method(){\n" +
                    "        return SampleClassExt2.method(string);\n" +
                    "    }\n" +
                    "\n" +
                    "}");

            fileText.add("\n" +
                    "\n" +
                    "public class SampleClassExt2 {\n" +
                    "    public static String method(String str) {\n" +
                    "        return str.toUpperCase();\n" +
                    "    }\n" +
                    "}\n");

            Map<String, String> map = new HashMap<>();

            for (int i = 0; i < fileNames.size(); i++) {
                map.put(fileNames.get(i).replace(".java", ""), fileText.get(i));
            }

            map = FileEditor.editFiles(map);

            ApplicationContext context = new AnnotationConfigApplicationContext(TaskCompilerImpl.class);
            TaskCompiler taskCompiler = context.getBean(TaskCompilerImpl.class);


            List<Class<?>> classList = taskCompiler.compileTask(map);

            ApplicationContext context2 = new AnnotationConfigApplicationContext(TaskRunnerImpl.class);
            TaskRunner taskRunner = context2.getBean(TaskRunnerImpl.class);

            String[] arr = {arg};
            Method method = taskRunner.findMethod(classList,"execute", arr);
            String ret  = taskRunner.runTask(method, arr);

            if (ret.equals(arr[0].toUpperCase())) {
                return ResponseEntity.status(HttpStatus.OK).body(ret);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NOT");
    }
}
