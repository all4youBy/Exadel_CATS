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
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BackEndApplication extends SpringBootServletInitializer {


	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BackEndApplication.class);
	}


}
