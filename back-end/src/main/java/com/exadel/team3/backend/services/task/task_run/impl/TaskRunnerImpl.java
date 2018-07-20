package com.exadel.team3.backend.services.task.task_run.impl;

import com.exadel.team3.backend.services.task.task_run.CustomClassLoader;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import com.sun.org.apache.xml.internal.security.c14n.InvalidCanonicalizerException;
import org.springframework.stereotype.Component;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

@Component
public class TaskRunnerImpl implements TaskRunner {

    @Override
    public boolean runTask(List<Class<?>> classList, String... args) {

        new Thread( () -> {

            // create the custom class loader
            ClassLoader classLoader = new CustomClassLoader();
            Method main = null;

            for (Class<?> clazz : classList) {
                try {
                    // load the class
                    clazz = classLoader.loadClass(classList.get(0).getSimpleName());

                    // get the main method
                    main = clazz.getMethod("main", args.getClass());
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                    return;
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                }
            }

            try {
                main.invoke(null, (Object) args);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }

        }).start();

        return true;
    }
}
