package com.exadel.team3.backend.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.exadel.team3.backend.dao.SolutionRepository;
import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.dao.TestRepository;
import com.exadel.team3.backend.dto.ActivityDTO;
import com.exadel.team3.backend.services.StatisticsService;

public class StatisticsServiceImpl implements StatisticsService {
    @Autowired
    private TestRepository testRepository;
    @Autowired
    private SolutionRepository solutionRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<ActivityDTO> getActivities(LocalDateTime after) {
        return null;
    }
}
