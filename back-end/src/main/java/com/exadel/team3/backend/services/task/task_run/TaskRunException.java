package com.exadel.team3.backend.services.task.task_run;

public class TaskRunException extends Exception {

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
