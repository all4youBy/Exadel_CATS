package com.exadel.team3.backend.dto.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class DtoMapper {

    @Autowired
    private ModelMapper mapper;

    public <T,R> R convector(Function<T,R> method,T entity){
        return method.apply(entity);
    }



}
