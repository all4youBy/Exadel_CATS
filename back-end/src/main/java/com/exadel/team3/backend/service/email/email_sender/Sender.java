package com.exadel.team3.backend.service.email.email_sender;

import com.exadel.team3.backend.service.email.email_command.email_command_type.EmailTypes;

public interface Sender {
    boolean send(EmailTypes emailTypes, String email);
}
