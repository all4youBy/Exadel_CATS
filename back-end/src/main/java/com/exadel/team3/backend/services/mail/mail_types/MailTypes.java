package com.exadel.team3.backend.services.mail.mail_types;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public enum MailTypes {
    SEND_LOGIN_AND_PASS("Text_for_send_log_and_pass.txt", "Subject_for_send_log_and_pass.txt"),
    VERIFICATION_TEST("Text_for_notification_verification_test.txt", "Subject_for_notification_verification_test.txt"),
    USERS_NOTIFICATION_TASK("Text_for_users_notification_task.txt", "Subject_for_users_notification.txt"),
    USERS_NOTIFICATION_TEST("Text_for_users_notification_test.txt", "Subject_for_users_notification.txt");

    private final static String PATH_TO_FILE_WITH_TEXT = "static/email_sender/text_for_email/";
    private final static String PATH_TO_FILE_WITH_SUBJECT = "static/email_sender/subject_for_email/";
    private String templateText;
    private String templateSubject;

    MailTypes(String templateNameText, String templateSubjectText) {
        this.templateText = readFile(PATH_TO_FILE_WITH_TEXT + templateNameText);
        this.templateSubject = readFile(PATH_TO_FILE_WITH_SUBJECT + templateSubjectText);
    }

    private String readFile(String nameFile) {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(MailTypes.class.getClassLoader().getResourceAsStream(nameFile)));
        String str = bufferedReader.lines().collect(Collectors.joining("\n"));
        return str;
    }

    public String getTemplateText() {
        return templateText;
    }

    public String getTemplateSubject() {
        return templateSubject;
    }
}
