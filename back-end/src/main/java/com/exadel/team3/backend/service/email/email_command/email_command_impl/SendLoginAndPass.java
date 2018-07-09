package com.exadel.team3.backend.service.email.email_command.email_command_impl;

import com.exadel.team3.backend.service.email.email_command.IEmailType;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;

@Component
public class SendLoginAndPass implements IEmailType {
    @Override
    public String getEmailSubject(String email) throws IOException {
        final Properties properties = new Properties();
        properties.load(SendLoginAndPass.class.getClassLoader().getResourceAsStream("email_sender/subject.properties"));

        String text = "";
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(properties.getProperty("name.subject.file.send_log_ans_pass")));
        try (BufferedReader reader = new BufferedReader(inputStreamReader)){
            String line;
            while ((line = reader.readLine()) != null) {
                text += line;
            }
        } catch (IOException e) {
            //TODO Exception here
        }

        return text;
    }

    @Override
    public String getEmailText(String email) throws IOException{

        // TODO get password from BD
        String password  = "passwordFrom";

        final Properties properties = new Properties();
        properties.load(SendLoginAndPass.class.getClassLoader().getResourceAsStream("email_sender/text.properties"));

        String text = "";
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(properties.getProperty("name.text.file.send_log_ans_pass")));
        try (BufferedReader reader = new BufferedReader(inputStreamReader)){
            String line;
            while ((line = reader.readLine()) != null) {
                text += line;
            }
        } catch (IOException e) {
            //TODO Exception here
        }

        text = text.replace("?1", email);
        text = text.replace("?2", password);
        return text;
    }
}
