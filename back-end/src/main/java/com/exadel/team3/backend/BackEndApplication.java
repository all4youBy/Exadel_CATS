package com.exadel.team3.backend;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserEducation;
import com.exadel.team3.backend.entities.UserRole;
import com.exadel.team3.backend.services.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackEndApplication {
    @Autowired
    private UserServiceImpl userService;

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

    @Bean
    CommandLineRunner getSimpleCommandLineRunner(ApplicationContext ctx) {
        return args -> {
            final Logger log = LoggerFactory.getLogger(this.getClass());

            if (userService != null) {
                userService.addUser("m@n.k","m", "n", UserRole.STUDENT,"112323");

                userService.assignGroup("some third group",  "m@n.k");

                User u = userService.getUser("m@n.k");
                u.setEducation(new UserEducation("БГУ", 2019, "Прикладная информатика", "singing"));
                userService.updateUser(u);
                u = userService.getUser("m@n.k");
                System.out.println(u);
                log.error(u.toString());

            } else {
                System.out.println("It's null!");
            }

        };
    }
}
