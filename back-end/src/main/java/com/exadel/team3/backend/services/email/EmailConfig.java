package com.exadel.team3.backend.services.email;

import com.exadel.team3.backend.services.email.email_sender.Sender;
import com.exadel.team3.backend.services.email.email_sender.impl.SenderImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;

@Configuration
@ComponentScan("com.exadel.team3.backend.services.email")
public class EmailConfig {
    @Autowired
    private Sender sender;
    Sender sender() {
        return new SenderImpl();
    }
}
