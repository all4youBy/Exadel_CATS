package com.exadel.team3.backend.services.email;

import com.exadel.team3.backend.services.email.email_command_type.EmailTypes;
import com.exadel.team3.backend.services.email.email_sender.Sender;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class ServiceSenderEmailTest {
    @Test
    public void test_confirm_email() {
        ApplicationContext context = new AnnotationConfigApplicationContext(EmailConfig.class);
        Sender sender = context.getBean(Sender.class);

        Map<String, String> map = new HashMap<String, String>();
        String email = "Skoriy.97@gmail.com";
        map.put("&email", email);
        map.put("&checker", "checker");

        boolean check = sender.send(EmailTypes.CONFIRM_EMAIL, email, map);
        assertEquals(check, true);
    }

    @Test
    public void test_text_for_notification_verification_test() {
        ApplicationContext context = new AnnotationConfigApplicationContext(EmailConfig.class);
        Sender sender = context.getBean(Sender.class);

        Map<String, String> map = new HashMap<String, String>();
        String email = "Skoriy.97@gmail.com";
        map.put("&link", "link");

        boolean check = sender.send(EmailTypes.VERIFICATION_TEST, email, map);
        assertEquals(check, true);
    }

    @Test
    public void text_text_for_send_log_and_pass() {
        ApplicationContext context = new AnnotationConfigApplicationContext(EmailConfig.class);
        Sender sender = context.getBean(Sender.class);

        Map<String, String> map = new HashMap<String, String>();
        String email = "Skoriy.97@gmail.com";
        map.put("&email", email);
        map.put("&password", "password");

        boolean check = sender.send(EmailTypes.SEND_LOGIN_AND_PASS, email, map);
        assertEquals(check, true);
    }
}
