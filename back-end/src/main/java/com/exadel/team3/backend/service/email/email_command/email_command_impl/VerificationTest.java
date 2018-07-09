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
public class VerificationTest implements IEmailType {
    @Override
    public String getEmailSubject(String email) throws IOException {
        final Properties properties = new Properties();
        properties.load(SendLoginAndPass.class.getClassLoader().getResourceAsStream("email_sender/subject.properties"));

        String text = "";
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(properties.getProperty("name.subject.file.notif_verif_test")));
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

        // TODO get link form BD
        String link = "link";
        final Properties properties = new Properties();
        properties.load(VerificationTest.class.getClassLoader().getResourceAsStream("email_sender/text.properties"));

        String text = "";
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(properties.getProperty("name.text.file.notif_verif_test")));
        try (BufferedReader reader = new BufferedReader(inputStreamReader)){
            String line;
            while ((line = reader.readLine()) != null) {
                text += line;
            }
        } catch (IOException e) {
            //TODO Exception here
        }
        text+= link;
        return text;
    }
}
