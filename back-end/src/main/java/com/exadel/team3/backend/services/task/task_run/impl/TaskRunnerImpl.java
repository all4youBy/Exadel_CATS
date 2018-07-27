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
    public Method findMethod(List<Class<?>> classList, String methodName, String[] args) {

        Method execute = null;
        for (Class<?> clazz : classList) {
            try {
                execute = clazz.getMethod(methodName, args.getClass());
            } catch (NoSuchMethodException ex) {
                logger.info("Can't find the \"execute\" method in %s class. " + ex.getMessage(), "");
            }
        }
        return execute;
    }

    @Override
    public String runTask(Method method, String[] args) throws TaskRunException{
        String executeReturn;
        try {
            executeReturn = method != null ? (String) method.invoke(null, (Object) args) : null;
        } catch (IllegalAccessException | InvocationTargetException ex) {
            logger.error("Can not run file" + ex.getMessage());
            throw new TaskRunException("Can not run file", ex);
        }
        return executeReturn;
    }
}
