package com.exadel.team3.backend.services.mail.mail_sender;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MailAuthenticator extends Authenticator {
    private String username;
    private String password;

    public static MailAuthenticator mailAuthenticatorInit(String username, String password) {
        return new MailAuthenticator(username, password);
    }

    private MailAuthenticator(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password);
    }
}
