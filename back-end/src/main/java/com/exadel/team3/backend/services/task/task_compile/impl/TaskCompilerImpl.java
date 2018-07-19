package com.exadel.team3.backend.services.task.task_compile.impl;

import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import org.springframework.stereotype.Component;

import javax.tools.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class TaskCompilerImpl implements TaskCompiler {

    private List<Class<?>> classList = new ArrayList<>();

    @Override
    public List<Class<?>> compileTask(List<File> fileList) {
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        DiagnosticCollector< JavaFileObject > diagnostics = new DiagnosticCollector<>();

        try(StandardJavaFileManager manager = compiler.getStandardFileManager( diagnostics,null, null)) {

            Iterable<? extends JavaFileObject> sources = manager.getJavaFileObjectsFromFiles(fileList);

            JavaCompiler.CompilationTask task = compiler.getTask( null, manager, diagnostics, null, null, sources );
            task.call();
        } catch (IOException ex) {
            //TODO Exception
            ex.printStackTrace();
        }

        try {
            for (File file : fileList) {

                Class<?> targetClass = Class.forName(file.getName().replace(".java", ""));
                classList.add(targetClass);

            }
        } catch (ClassNotFoundException ex) {
            //TODO Exception
        }
        return classList;
    }

    @Override
    public boolean deleteClasses() {
        boolean flag = true;
        for(Class<?> classik : classList) {
            if (flag) {
                flag = new File(classik.getSimpleName()).delete();
            }
        }
        return flag;
    }

    public List<Class<?>> getClassList() {
        return classList;
    }
}
