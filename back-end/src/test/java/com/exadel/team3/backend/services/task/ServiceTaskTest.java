package com.exadel.team3.backend.services.task;

import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import com.exadel.team3.backend.services.task.task_compile.impl.TaskCompilerImpl;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import com.exadel.team3.backend.services.task.task_run.impl.TaskRunnerImpl;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.junit.Assert.assertEquals;

public class ServiceTaskTest {
//    @Test
//    public void test_task() {
//        ApplicationContext context = new AnnotationConfigApplicationContext(TaskCompilerImpl.class);
//        TaskCompiler taskCompiler = context.getBean(TaskCompilerImpl.class);
//        taskCompiler.compileTask(null);
//
//
//        ApplicationContext context2 = new AnnotationConfigApplicationContext(TaskRunnerImpl.class);
//        TaskRunner taskRunner = context2.getBean(TaskRunnerImpl.class);
//
////        Runnable taskThread = new TaskThread(taskRunner);
////        new Thread(taskThread).start();
//    }
}
