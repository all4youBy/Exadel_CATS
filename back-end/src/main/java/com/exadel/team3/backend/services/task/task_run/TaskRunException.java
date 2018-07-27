package com.exadel.team3.backend.services.task.task_run;

import com.exadel.team3.backend.services.ServiceException;

public class TaskRunException extends ServiceException {

    public TaskRunException() {
        super();
    }

    public TaskRunException(String message) {
        super(message);
    }

    public TaskRunException(String message, Throwable cause) {
        super(message, cause);
    }

    public TaskRunException(Throwable cause) {
        super(cause);
    }
}
