package com.exadel.team3.backend.services.task.task_compile;

import com.exadel.team3.backend.services.ServiceException;

public class TaskCompileException extends ServiceException {
    public TaskCompileException() {
        super();
    }

    public TaskCompileException(String message) {
        super(message);
    }

    public TaskCompileException(String message, Throwable cause) {
        super(message, cause);
    }

    public TaskCompileException(Throwable cause) {
        super(cause);
    }
}
