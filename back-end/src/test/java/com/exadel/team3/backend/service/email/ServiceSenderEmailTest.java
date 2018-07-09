package com.exadel.team3.backend.service.email;

import com.exadel.team3.backend.service.email.email_command.email_command_type.EmailTypes;
import com.exadel.team3.backend.service.email.email_sender.Sender;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.junit.Assert.assertEquals;

public class ServiceSenderEmailTest {
    @Test
    public void test_confirm_email() {
        ApplicationContext context = new AnnotationConfigApplicationContext(Config.class);
        Sender sender = context.getBean(Sender.class);

        boolean check = sender.send(EmailTypes.CONFIRM_EMAIL, "Skoriy.97@gmail.com");
        assertEquals(check, true);
    }

    @Test
    public void test_text_for_notification_verification_test() {
        ApplicationContext context = new AnnotationConfigApplicationContext(Config.class);
        Sender sender = context.getBean(Sender.class);

        boolean check = sender.send(EmailTypes.VERIFICATION_TEST, "Skoriy.97@gmail.com");
        assertEquals(check, true);
    }

    @Test
    public void text_text_for_send_log_and_pass() {
        ApplicationContext context = new AnnotationConfigApplicationContext(Config.class);
        Sender sender = context.getBean(Sender.class);

        boolean check = sender.send(EmailTypes.SEND_LOGIN_AND_PASS, "Skoriy.97@gmail.com");
        assertEquals(check, true);
    }
}
