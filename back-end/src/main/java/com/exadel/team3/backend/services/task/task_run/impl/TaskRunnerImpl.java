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

    @Override
    public boolean runTask(List<Class<?>> classList, String... args) {

        // create the custom class loader
        ClassLoader classLoader = new CustomClassLoader();
        Method main = null;

        for (Class<?> clazz : classList) {
            try {

                // get the main method
                main = clazz.getMethod("main", args.getClass());
            } catch (NoSuchMethodException ex) {
                logger.info("did not find the \"main\" method in this class. " + ex.getMessage());
            }
        }

        try {
            main.invoke(null, (Object) args);
        } catch (IllegalAccessException | InvocationTargetException ex) {
            logger.error("Can not run file" + ex.getMessage());
        }

        //TODO It is necessary to write this file into the database
        //new File(getClass().getClassLoader().getResource(nameOfOutputFile).getFile());


        //TODO Ask the database if there is such a file
        // return new File(getClass().getClassLoader().getResource(nameOfOutputFile).getFile()).exists();
        return true;
    }
}
