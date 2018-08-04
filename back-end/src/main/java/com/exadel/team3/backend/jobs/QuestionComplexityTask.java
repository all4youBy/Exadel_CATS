package com.exadel.team3.backend.jobs;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class QuestionComplexityTask {


    @Scheduled(fixedDelay = 3000)
    public void calculateComplexity(){
//        System.out.println("Janna skoro pridet, rabotaem rabotyagi");
    }
}
