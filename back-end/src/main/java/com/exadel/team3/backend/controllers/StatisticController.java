package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.services.AssignableService;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TaxonomyService;
import com.exadel.team3.backend.services.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/statistic")
public class StatisticController {

    @Autowired
    private TaxonomyService taxonomyService;

    @Autowired
    private TestService testService;

    @Autowired
    private SolutionService solutionService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getInstitutions(){
        return taxonomyService.getByKey("institutions");
    }

//    public ResponseEntity<?> getTopRatings
}
