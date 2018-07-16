package com.exadel.team3.backend.entities;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserEducation {
    private String institution;
    private int graduationYear;
    private String specialization;
    private String primarySkill;
}