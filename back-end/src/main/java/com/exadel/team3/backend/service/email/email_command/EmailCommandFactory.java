package com.exadel.team3.backend.service.email.email_command;

import com.exadel.team3.backend.service.email.email_command.email_command_impl.ConfirmEmail;
import com.exadel.team3.backend.service.email.email_command.email_command_impl.SendLoginAndPass;
import com.exadel.team3.backend.service.email.email_command.email_command_type.EmailTypes;
import com.exadel.team3.backend.service.email.email_command.email_command_impl.VerificationTest;

import java.io.IOException;
import java.util.EnumMap;
import java.util.Map;

public class EmailCommandFactory {
    private EmailCommandFactory() {
    }

    private static final Map<EmailTypes, IEmailType> commands = new EnumMap<>(EmailTypes.class);

    static {
        commands.put(EmailTypes.CONFIRM_EMAIL, new ConfirmEmail());
        commands.put(EmailTypes.SEND_LOGIN_AND_PASS, new SendLoginAndPass());
        commands.put(EmailTypes.VERIFICATION_TEST, new VerificationTest());
    }

    public static String getEmailText(EmailTypes emailType, String email) throws IOException{
        IEmailType command = commands.get(emailType);
        return command.getEmailText(email);
    }
}
