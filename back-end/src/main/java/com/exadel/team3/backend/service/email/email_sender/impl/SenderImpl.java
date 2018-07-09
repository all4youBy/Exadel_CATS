package com.exadel.team3.backend.service.email.email_sender.impl;

import com.exadel.team3.backend.service.email.email_command.EmailCommandFactory;
import com.exadel.team3.backend.service.email.email_command.email_command_type.EmailTypes;
import com.exadel.team3.backend.service.email.email_sender.Sender;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Component
public class SenderImpl implements Sender {
    private String username;
    private String password;

    public SenderImpl() {
        try {
            Properties properties = new Properties();
            InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("email_sender/mail.properties");
            properties.load(inputStream);

            username = properties.getProperty("emailFrom");
            password = properties.getProperty("passwordFrom");
        } catch (IOException e) {
            //TODO exception here;
        }
    }

    public boolean send(EmailTypes emailType, String toEmail) {

        try {
            final Properties properties = new Properties();
            properties.load(Sender.class.getClassLoader().getResourceAsStream("email_sender/mail.properties"));

            Session session = Session.getInstance(properties, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(EmailCommandFactory.getEmailSubject(emailType, toEmail));
            message.setContent(EmailCommandFactory.getEmailText(emailType, toEmail), "text/html; charset=utf-8");
            Transport.send(message);
            return true;
        } catch (IOException | MessagingException ex) {
            return false;
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
