package com.exadel.team3.backend.services.task.task_run;

import java.lang.reflect.Method;
import java.util.List;

public interface TaskRunner {
    Method findMethod(List<Class<?>> classList, String methodName, String[] args) throws TaskRunException;
    String runTask(Method method, String[] args) throws TaskRunException;
}
