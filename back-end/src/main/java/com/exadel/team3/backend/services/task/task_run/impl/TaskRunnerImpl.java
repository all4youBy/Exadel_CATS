package com.exadel.team3.backend.services.task.task_run.impl;

import com.exadel.team3.backend.services.task.task_run.CustomClassLoader;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.List;

@Component
public class TaskRunnerImpl implements TaskRunner {
    private List<Class<?>> classList;

    @Override
    public boolean runTask(List<Class<?>> classList, String... args) {
        this.classList = classList;

        new Thread(() -> {
            try {
                // create the custom class loader
                ClassLoader cl = new CustomClassLoader();

                // load the class
                Class<?> clazz = cl.loadClass(classList.get(0).getSimpleName());

                // get the main method
                Method main = clazz.getMethod("main", args.getClass());

                // and invoke it
                main.invoke(null, (Object) args);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();

        return true;
    }

    public List<Class<?>> getClassList() {
        return classList;
    }
}
