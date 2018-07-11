package com.exadel.team3.backend.services.mail.mail_types;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public enum MailTypes {

    CONFIRM_EMAIL("Text_for_confirm_email.txt", "Subject_for_congirm_email.txt"),
    SEND_LOGIN_AND_PASS("Text_for_send_log_and_pass.txt", "Subject_for_send_log_and_pass.txt"),
    VERIFICATION_TEST("Text_for_notification_verification_test.txt", "Subject_for_notification_verification_test.txt");

    private final static String PATH_TO_FILE_WITH_TEXT = "email_sender/text_for_email/";
    private final static String PATH_TO_FILE_WITH_SUBJECT = "email_sender/text_for_email/";
    private String templateText;
    private String templateSubject;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    MailTypes(String templateNameText, String templateSubjectText) {
        this.templateText = readFile(PATH_TO_FILE_WITH_TEXT + templateNameText);
        this.templateSubject = readFile(PATH_TO_FILE_WITH_SUBJECT + templateSubjectText);
    }

    private String readFile(String nameFile) {
        InputStreamReader inputStreamReader = new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(nameFile));
        String text = "";
        try (BufferedReader reader = new BufferedReader(inputStreamReader)){
            String line;
            while ((line = reader.readLine()) != null) {
                text += line;
            }
        } catch (IOException ex) {
            logger.error("Could not read file with subject or message text.");
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
