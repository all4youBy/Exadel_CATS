package com.exadel.team3.backend.services.task.task_compile;

public class TaskCompileExceptoin extends Exception {
    public TaskCompileExceptoin() {
        super();
    }

    public TaskCompileExceptoin(String message) {
        super(message);
    }

    public TaskCompileExceptoin(String message, Throwable cause) {
        super(message, cause);
    }

    public TaskCompileExceptoin(Throwable cause) {
        super(cause);
    }
}
