package com.exadel.team3.backend.services.task.task_run.impl;

import com.exadel.team3.backend.services.task.task_run.TaskRunException;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

@Component
public class TaskRunnerImpl implements TaskRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public String runTask(List<Class<?>> classList, String[] args) throws TaskRunException {

        Method execute = null;
        for (Class<?> clazz : classList) {
            try {
                execute = clazz.getMethod("execute", args.getClass());
            } catch (NoSuchMethodException ex) {
                logger.info("Can't find the \"execute\" method in this class. " + ex.getMessage());
            }
        }

        String executeReturn = null;
        try {
            executeReturn = execute != null ? (String) execute.invoke(null, (Object) args) : null;
        } catch (IllegalAccessException | InvocationTargetException ex) {
            logger.error("Can not run file" + ex.getMessage());
            throw new TaskRunException("Can not run file", ex);
        }
        return executeReturn;
    }
}
