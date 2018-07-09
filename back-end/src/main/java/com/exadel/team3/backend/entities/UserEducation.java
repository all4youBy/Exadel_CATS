package com.exadel.team3.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class UserEducation {
    private String institution;
    private int graduationYear;
    private String specialization;
    private String primarySkill;
}