package com.exadel.team3.backend.service.email.email_command;

import java.io.IOException;

public interface IEmailType {
    String getEmailText(String email) throws IOException;
}
