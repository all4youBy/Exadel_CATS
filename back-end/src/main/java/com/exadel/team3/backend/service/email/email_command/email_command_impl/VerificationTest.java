package com.exadel.team3.backend.service.email.email_command.email_command_impl;

import com.exadel.team3.backend.service.email.email_command.IEmailType;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;

public class VerificationTest implements IEmailType {
    @Override
    public String execute(String email) throws IOException{

        // TODO get link form BD
        String link = "link";
        final Properties properties = new Properties();
        properties.load(VerificationTest.class.getClassLoader().getResourceAsStream("mail.properties"));

        List<String> lines = Files.readAllLines(Paths.get(properties.getProperty("Text_for_confirm_email.txt")), StandardCharsets.UTF_8);

        String text = "";
        for(String line: lines){
            text += line;
        }
        text+= link;
        return text;
    }
}
