package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.services.SolutionChecker;

public class CompileRunThread extends Thread {
    private SolutionChecker solutionChecker;
    private Solution solution;

    public CompileRunThread(SolutionChecker solutionChecker, Solution solution) {
        this.solutionChecker = solutionChecker;
        this.solution = solution;
    }

    @Override
    public void run() {
        solutionChecker.check(solution);
        int mark = solutionChecker.check(solution);
        if (mark > solution.getMark()) {
            solution.setMark(mark);
        }
    }
}
