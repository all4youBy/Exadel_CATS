package com.exadel.team3.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
public class UniversitiesFacultiesDTO {

    @Setter
    @Getter
    private String university;

    @Setter
    @Getter
    private Collection<String> faculties;
}
