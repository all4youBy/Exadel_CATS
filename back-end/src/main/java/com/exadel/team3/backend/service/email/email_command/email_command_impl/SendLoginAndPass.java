package com.exadel.team3.backend.service.email.email_command.email_command_impl;

import com.exadel.team3.backend.service.email.email_command.IEmailType;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;

public class SendLoginAndPass implements IEmailType {
    @Override
    public String getEmailText(String email) throws IOException{

        // TODO get password from BD
        String password  = "password";

        final Properties properties = new Properties();
        properties.load(SendLoginAndPass.class.getClassLoader().getResourceAsStream("mail.properties"));

        List<String> lines = Files.readAllLines(Paths.get(properties.getProperty("Text_for_send_log_and_pass.txt")), StandardCharsets.UTF_8);

        String text = "";
        for(String line: lines){
            text += line;
        }
        text = text.replace("?1", email);
        text = text.replace("?2", password);
        return text;
    }
}
