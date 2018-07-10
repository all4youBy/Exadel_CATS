package com.exadel.team3.backend;

import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.services.impl.QuestionServiceImpl;
import com.exadel.team3.backend.services.impl.TopicServiceImpl;
import com.exadel.team3.backend.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class BackEndApplication extends SpringBootServletInitializer {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private QuestionServiceImpl questionService;
    @Autowired
    private TopicServiceImpl topicService;


	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(BackEndApplication.class);
    }

    @Bean
    CommandLineRunner getSimpleCommandLineRunner(ApplicationContext ctx) {
        return args -> {
            /*if (userService != null) {
                userService.addUser("f@g.h","f", "g", UserRole.STUDENT,"112323");
                userService.addUser("d@e.f","d", "e", UserRole.TEACHER, "998776");
                userService.assignGroup(Arrays.asList("f@g.h", "d@e.f"), "test group");
                userService.getUsersByGroup("test group").forEach(System.out::println);

            } else {
                System.out.println("It's null!");
            }*/


            Topic java = new Topic("Java");
            Set<Topic> javaTopics = new HashSet<>(Arrays.asList(new Topic("Массивы"), new Topic("Коллекции"), new Topic("Maps")));
            java.setTopics(javaTopics);

            Topic csharp = new Topic("C#");
            Set<Topic> csharpTopics = new HashSet<>(Arrays.asList(new Topic("Массивы"), new Topic("Коллекции"), new Topic("Dictionaries")));
            csharp.setTopics(csharpTopics);

            Topic devel = topicService.addTopic("Программирование", new HashSet<>(Arrays.asList(java, csharp)));

            System.out.println(devel);

             questionService.addQuestion(
                    QuestionType.SINGLE_VARIANT,
                    "Ответ на основной вопрос жизни, вселенной и всего такого",
                    Arrays.asList(csharp.getId()),
                    Arrays.asList(
                            new Answer("42", true),
                            new Answer("45", false),
                            new Answer("51", false)
                    ),
                    QuestionComplexity.LEVEL_1,
                    "a@b.c"
            );

            questionService.getQuestions(Arrays.asList(csharp.getId())).forEach(System.out::println);
        };
    }
}
