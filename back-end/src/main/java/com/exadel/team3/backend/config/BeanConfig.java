package com.exadel.team3.backend.config;

import com.exadel.team3.backend.dto.mappers.SolutionDTOMapper;
import com.exadel.team3.backend.dto.mappers.TestDTOMapper;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
    @Bean
    public TestDTOMapper testDTOMapper(){return new TestDTOMapper();}

    @Bean
    public SolutionDTOMapper solutionDTOMapper() {
        return new SolutionDTOMapper();
    }
}
