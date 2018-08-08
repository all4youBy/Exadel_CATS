package com.exadel.team3.backend.jobs;

import com.exadel.team3.backend.services.DbManagementService;
import com.exadel.team3.backend.services.mail.mail_sender.MailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks{

    @Autowired
    private MailSender mailSender;

    @Autowired
    private DbManagementService dbManagementService;

    @Scheduled(cron = "0 0 12 * * *")
    public void calculateComplexity(){
        dbManagementService.reassessLatestQuestions();
    }

}
