package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Solution;

public interface SolutionChecker {
    int check(Solution solution) throws ServiceException;
}
