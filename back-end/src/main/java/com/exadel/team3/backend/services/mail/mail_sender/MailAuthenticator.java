package com.exadel.team3.backend.services.mail.mail_sender;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MailAuthenticator extends Authenticator {
    private String username;
    private String password;
    private static MailAuthenticator mailAuthenticator;

    private MailAuthenticator(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public static MailAuthenticator getInstance() {
        return mailAuthenticator;
    }

    public static MailAuthenticator getInstance(String username, String password) {
        mailAuthenticator = new MailAuthenticator(username, password);
        return mailAuthenticator;
    }

    @Override
    public PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password);
    }
}
