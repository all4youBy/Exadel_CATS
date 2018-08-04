package com.exadel.team3.backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.SolutionRepository;
import com.exadel.team3.backend.dao.TestRepository;
import com.exadel.team3.backend.dto.ActivityDTO;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    @Autowired
    private SolutionRepository solutionRepository;
    @Autowired
    private TestRepository testRepository;

    @Override
    public List<ActivityDTO> getActivities(LocalDateTime after) {
        List<ActivityDTO> activities = new ArrayList<>();
/*
        testRepository.findAllOrderByDeadlineDesc().forEach(
            test -> activities.add(new ActivityDTO(

            ));
        );
*/
        return null;
    }
}
