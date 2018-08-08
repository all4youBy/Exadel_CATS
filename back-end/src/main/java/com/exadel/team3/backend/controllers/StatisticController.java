package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.dto.UserRatingDTO;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TaxonomyService;
import com.exadel.team3.backend.services.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/statistic")
public class StatisticController {

    @Autowired
    private TestService testService;

    @Autowired
    private SolutionService solutionService;


    @GetMapping(value = "/tests",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserRatingDTO> getTopRatingsSumTest(){
        return testService.getTopRatingBySum();
    }

    @GetMapping(value = "/tests/average",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserRatingDTO> getTopRatingByAverageTest(){
        return testService.getTopRatingByAverage();
    }

    @GetMapping(value = "/tasks",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserRatingDTO> getTopRatingBySumTask(){
        return solutionService.getTopRatingBySum();
    }

    @GetMapping(value = "/tasks/average",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserRatingDTO> getTopRatingByAverageTask(){
        return solutionService.getTopRatingByAverage();
    }


}
