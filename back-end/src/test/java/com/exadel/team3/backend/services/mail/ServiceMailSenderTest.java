package com.exadel.team3.backend.services.mail;

import com.exadel.team3.backend.services.mail.mail_sender.impl.MailSenderImpl;
import com.exadel.team3.backend.services.mail.mail_types.MailTypes;
import com.exadel.team3.backend.services.mail.mail_sender.MailSender;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class ServiceMailSenderTest {
    @Test
    public void test_confirm_email() {
        ApplicationContext context = new AnnotationConfigApplicationContext(MailSenderImpl.class);
        MailSender mailSender = context.getBean(MailSender.class);

        Map<String, String> map = new HashMap<String, String>();
        String email = "Skoriy.97@gmail.com";
        map.put("&email", email);
        map.put("&checker", "checker");

        boolean check = mailSender.send(MailTypes.CONFIRM_EMAIL, email, map);
        assertEquals(check, true);
    }

    @Test
    public void test_text_for_notification_verification_test() {
        ApplicationContext context = new AnnotationConfigApplicationContext(MailSenderImpl.class);
        MailSender mailSender = context.getBean(MailSender.class);

        Map<String, String> map = new HashMap<String, String>();
        String email = "Skoriy.97@gmail.com";
        map.put("&link", "link");

        boolean check = mailSender.send(MailTypes.VERIFICATION_TEST, email, map);
        assertEquals(check, true);
    }

    @Test
    public void text_text_for_send_log_and_pass() {
        ApplicationContext context = new AnnotationConfigApplicationContext(MailSenderImpl.class);
        MailSender mailSender = context.getBean(MailSender.class);

        Map<String, String> map = new HashMap<String, String>();
        String email = "Skoriy.97@gmail.com";
        map.put("&email", email);
        map.put("&password", "password");

        boolean check = mailSender.send(MailTypes.SEND_LOGIN_AND_PASS, email, map);
        assertEquals(check, true);
    }
}
