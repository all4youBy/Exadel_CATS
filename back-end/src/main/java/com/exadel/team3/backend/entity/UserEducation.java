package com.exadel.team3.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class UserEducation {
    private String passwordHash;
    private String institution;
    private String specialization;
    private String primarySkill;
    private int graduationYear;
}