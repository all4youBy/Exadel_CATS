package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Solution;

@FunctionalInterface
public interface SolutionCheckerRoutine <E extends ServiceException> {
    boolean check(Solution solution, String input, String output) throws E;
}
