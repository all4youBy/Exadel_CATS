package com.exadel.team3.backend.service.email;

import com.exadel.team3.backend.service.email.email_command.EmailCommandFactory;
import com.exadel.team3.backend.service.email.email_command.email_command_impl.ConfirmEmail;
import com.exadel.team3.backend.service.email.email_command.email_command_impl.SendLoginAndPass;
import com.exadel.team3.backend.service.email.email_command.email_command_impl.VerificationTest;
import com.exadel.team3.backend.service.email.email_sender.Sender;
import com.exadel.team3.backend.service.email.email_sender.impl.SenderImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.exadel.team3.backend.service.email")
public class Config {
    @Autowired
    private Sender sender;
    Sender sender() {
        return new SenderImpl();
    }

    @Bean
    EmailCommandFactory emailCommandFactory() {
        return new EmailCommandFactory();
    }

    @Bean
    ConfirmEmail confirmEmail() {
        return new ConfirmEmail();
    }

    @Bean
    SendLoginAndPass sendLoginAndPass() {
        return new SendLoginAndPass();
    }

    @Bean
    VerificationTest verificationTest() {
        return new VerificationTest();
    }

}
