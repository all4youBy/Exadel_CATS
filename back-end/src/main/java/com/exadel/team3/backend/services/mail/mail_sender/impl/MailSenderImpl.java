package com.exadel.team3.backend.services.mail.mail_sender.impl;

import com.exadel.team3.backend.services.mail.mail_sender.MailAuthenticator;
import com.exadel.team3.backend.services.mail.mail_types.MailTypes;
import com.exadel.team3.backend.services.mail.mail_sender.MailSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Properties;

@Component
@PropertySource("classpath:application.properties")
public class MailSenderImpl implements MailSender {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${emailFrom}")
    private String username;

    @Value("${passwordFrom}")
    private String password;

    @Value("${mail.smtp.auth}")
    private String auth;

    @Value("${mail.smtp.starttls.enable}")
    private String starttls_enable;

    @Value("${mail.smtp.host}")
    private String host;

    @Value("${mail.smtp.port}")
    private String port;

    @Value("${mail.smtp.ssl.trust}")
    private String ssl_trust;

    private Properties properties = new Properties();

    @PostConstruct
    public void propertiesInit() {
        properties.setProperty("mail.smtp.auth", auth);
        properties.setProperty("mail.smtp.starttls.enable", starttls_enable);
        properties.setProperty("mail.smtp.host", host);
        properties.setProperty("mail.smtp.port", port);
        properties.setProperty("mail.smtp.ssl.trust", ssl_trust);
    }

    public boolean send(MailTypes emailType, String toEmail, Map<String, String> replacementMap) {

        try {
            Session session = Session.getInstance(properties, MailAuthenticator.mailAuthenticatorInit(username, password));

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(emailType.getTemplateSubject());
            message.setContent(replaseVariabl(emailType.getTemplateText(),replacementMap), "text/html; charset=utf-8");
            Transport.send(message);
            return true;
        } catch ( MessagingException ex) {
            logger.error("Could not send message to user. " + ex.getMessage());
            return false;
        }
    }

    private String replaseVariabl(String text, Map<String, String> replacementMap) {

        for(Map.Entry<String, String> entry : replacementMap.entrySet()) {
            text = text.replaceAll(entry.getKey(), entry.getValue());
        }
        return text;
    }
}
