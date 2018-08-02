package com.exadel.team3.backend.services.task;

import com.exadel.team3.backend.controllers.TaskController;
import com.exadel.team3.backend.controllers.TestController;
import com.exadel.team3.backend.services.mail.mail_sender.MailSender;
import com.exadel.team3.backend.services.mail.mail_sender.impl.MailSenderImpl;
import com.exadel.team3.backend.services.mail.mail_types.MailTypes;
import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
import com.exadel.team3.backend.services.task.task_compile.impl.TaskCompilerImpl;
import com.exadel.team3.backend.services.task.task_run.TaskRunner;
import com.exadel.team3.backend.services.task.task_run.impl.TaskRunnerImpl;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class ServiceTaskTest {
//    @Test
//    public void test_task() {
//        TaskController taskController = new TaskController();
//        taskController.addFilesInSolution();
//    }
}
