//package com.exadel.team3.backend.services.task;
//
//import com.exadel.team3.backend.controllers.TaskController;
//import com.exadel.team3.backend.controllers.TestController;
//import com.exadel.team3.backend.controllers.requests.FileWrapper;
//import com.exadel.team3.backend.services.mail.mail_sender.MailSender;
//import com.exadel.team3.backend.services.mail.mail_sender.impl.MailSenderImpl;
//import com.exadel.team3.backend.services.mail.mail_types.MailTypes;
//import com.exadel.team3.backend.services.task.task_compile.TaskCompiler;
//import com.exadel.team3.backend.services.task.task_compile.impl.TaskCompilerImpl;
//import com.exadel.team3.backend.services.task.task_run.TaskRunner;
//import com.exadel.team3.backend.services.task.task_run.impl.TaskRunnerImpl;
//import org.junit.Assert;
//import org.junit.Test;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.AnnotationConfigApplicationContext;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.*;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import static org.junit.Assert.assertEquals;
//
//public class ServiceTaskTest {
//    @Test
//    public void test_task() {
//        TaskController taskController = new TaskController();
//
//        Path path = Paths.get("C:/Users/Skori/Desktop/Exadel_CATS/back-end/src/main/resources/static/email_sender/text_for_email/Text_for_confirm_email.txt");
//        String name = "Text_for_confirm_email.txt";
//        String originalFileName = "Text_for_confirm_email.txt";
//        String contentType = "text/plain";
//        byte[] content = null;
//        try {
//            content = Files.readAllBytes(path);
//        } catch (final IOException e) {
//            e.printStackTrace();
//        }
//
//        MultipartFile multipartFile = new MockMultipartFile(name,
//                originalFileName, contentType, content);
//        FileWrapper fileWrapper = new FileWrapper(multipartFile);
//        taskController.addFilesInSolution(fileWrapper, "5b61dc524f0b7705147a7079");
//    }
//}
