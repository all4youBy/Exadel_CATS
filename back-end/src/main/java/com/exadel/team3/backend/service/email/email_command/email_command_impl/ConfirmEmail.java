package com.exadel.team3.backend.service.email.email_command.email_command_impl;

import com.exadel.team3.backend.service.email.email_command.IEmailType;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Properties;

@Component
public class ConfirmEmail implements IEmailType {

    @Override
    public String getEmailSubject(String email) throws IOException {
        final Properties properties = new Properties();
        properties.load(this.getClass().getClassLoader().getResourceAsStream("email_sender/subject.properties"));

        String text = "";
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(properties.getProperty("name.subject.file.confirm_email")));
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
    public String getEmailText(String email) throws IOException {

        // TODO get checker from BD
        String checker  = java.util.UUID.randomUUID().toString();

        final Properties properties = new Properties();
        properties.load(ConfirmEmail.class.getClassLoader().getResourceAsStream("email_sender/text.properties"));

        String text = "";
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(properties.getProperty("name.text.file.confirm_email")));
        try (BufferedReader reader = new BufferedReader(inputStreamReader)){
            String line;
            while ((line = reader.readLine()) != null) {
                text += line;
            }
        } catch (IOException e) {
            //TODO Exception here
        }

        text = text + "<a href=\"" + email + "?id=" + checker + "\" >" + email + "?id=" + checker + "</a>";
        return text;
    }
}
