package com.exadel.team3.backend.services.task;

import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import com.exadel.team3.backend.services.task.task_compile.impl.TaskCompilerImpl;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.junit.Assert.assertEquals;

public class ServiceTaskTest {
    @Test
    public void test_task_compiler() {
        ApplicationContext context = new AnnotationConfigApplicationContext(TaskCompilerImpl.class);
        TaskCompiler taskCompiler = context.getBean(TaskCompiler.class);

        assertEquals(true, true);
    }
}
