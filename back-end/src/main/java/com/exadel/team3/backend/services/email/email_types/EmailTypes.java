package com.exadel.team3.backend.services.email.email_types;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public enum EmailTypes {

    CONFIRM_EMAIL("email_sender/text_for_email/Text_for_confirm_email.txt", "email_sender/subject_for_email/Subject_for_congirm_email.txt"),
    SEND_LOGIN_AND_PASS("email_sender/text_for_email/Text_for_send_log_and_pass.txt", "email_sender/subject_for_email/Subject_for_send_log_and_pass.txt"),
    VERIFICATION_TEST("email_sender/text_for_email/Text_for_notification_verification_test.txt", "email_sender/subject_for_email/Subject_for_notification_verification_test.txt");

    private String templateText;
    private String templateSubject;

    EmailTypes(String templateNameText, String templateSubjectText) {
        this.templateText = readFile(templateNameText);
        this.templateSubject = readFile(templateSubjectText);
    }

    private String readFile(String nameFile) {
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(nameFile));
        String text = "";
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

    public String getTemplateText() {
        return templateText;
    }

    public String getTemplateSubject() {
        return templateSubject;
    }
}
