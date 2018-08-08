package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.dto.JSONAnswerDTO;
import com.exadel.team3.backend.dto.UserRatingDTO;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.StatisticsService;
import com.exadel.team3.backend.services.TestService;
;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statistic")
public class StatisticController {

    @Autowired
    private TestService testService;

    @Autowired
    private SolutionService solutionService;

    @Autowired
    private StatisticsService statisticsService;


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

    @GetMapping(value = "/tasks/top-rating-sum/{objectId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTopRatingTaskBySum(@PathVariable String objectId){
        return ResponseEntity.ok().body(solutionService.getTopRatingBySum(new ObjectId(objectId)));
    }

    @GetMapping(value = "/tasks/top-rating-average/{objectId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTopRatingByAverage(@PathVariable String objectId){
        return ResponseEntity.ok().body(solutionService.getTopRatingByAverage(new ObjectId(objectId)));
    }

    @GetMapping(value = "/tasks/average",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserRatingDTO> getTopRatingByAverageTask(){
        return solutionService.getTopRatingByAverage();
    }

    @GetMapping(value = "/activities",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getActivities(){
        List<?> activities = statisticsService.getActivities();

        return statisticsService.getActivities() == null?
                ResponseEntity.status(HttpStatus.NO_CONTENT).body(activities):
                ResponseEntity.ok().body(activities);
    }

    @GetMapping(value = "/activities-group",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getActivitiesOfGroup(@RequestParam("group") List<String> groups){
        List<?> activitiesGroup = statisticsService.getActivitiesOfGroups(groups);

        return activitiesGroup == null?
                ResponseEntity.status(HttpStatus.NO_CONTENT).body(new JSONAnswerDTO("Can't find any activities")):
                ResponseEntity.ok().body(activitiesGroup);
    }

    @GetMapping(value = "/activities-top-rating",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTopRatingByActivities(){
        List<?> topRatings = statisticsService.getTopRatingByActivities();

        return topRatings == null?
                ResponseEntity.status(HttpStatus.NO_CONTENT).body("Can't find top ratings activities"):
                ResponseEntity.ok().body(topRatings);

    }
}
