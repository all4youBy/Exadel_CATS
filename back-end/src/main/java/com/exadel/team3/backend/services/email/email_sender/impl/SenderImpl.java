package com.exadel.team3.backend.services.email.email_sender.impl;

import com.exadel.team3.backend.services.email.email_command_type.EmailTypes;
import com.exadel.team3.backend.services.email.email_sender.Sender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Map;
import java.util.Properties;

@Component
@PropertySource("classpath:application.properties")
public class SenderImpl implements Sender {
    @Value("${emailFrom}")
    private String username;

    @Value("${passwordFrom}")
    private String password;

    public SenderImpl() {
    }

    public boolean send(EmailTypes emailType, String toEmail, Map<String, String> replacementMap) {

        try {
            final Properties properties = new Properties();
            properties.load(Sender.class.getClassLoader().getResourceAsStream("application.properties"));

            Session session = Session.getInstance(properties, new Authenticator() {
                public PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(emailType.getTemplateSubject());
            message.setContent(replaseVariabl(emailType.getTemplateText(),replacementMap), "text/html; charset=utf-8");
            Transport.send(message);
            return true;
        } catch (IOException | MessagingException ex) {
            return false;
        }
    }

    private String replaseVariabl(String text, Map<String, String> replacementMap) {
        for(Map.Entry<String, String> entry : replacementMap.entrySet()) {
            text = text.replace(entry.getKey(), entry.getValue());
        }
        return text;
    }
}
