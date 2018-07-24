package com.exadel.team3.backend.services.task.task_run.impl;

import com.exadel.team3.backend.services.task.task_run.CustomClassLoader;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

@Component
public class TaskRunnerImpl implements TaskRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static String nameOfOutputFile = "out";

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
                } catch (ClassNotFoundException ex) {
                    logger.error("Could not load class. " + ex.getMessage());
                    return;
                } catch (NoSuchMethodException ex) {
                    logger.info("did not find the \"main\" method in this class. " + ex.getMessage());
                }
            }

            try {
                main.invoke(null, (Object) args);
            } catch (IllegalAccessException | InvocationTargetException ex) {
                logger.error("Can not compile file" + ex.getMessage());
            }

            //TODO It is necessary to write this file into the database
            new File(getClass().getClassLoader().getResource(nameOfOutputFile).getFile());

        }).start();

        //TODO Ask the database if there is such a file
        // return new File(getClass().getClassLoader().getResource(nameOfOutputFile).getFile()).exists();
        return true;
    }
}
