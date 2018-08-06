package com.exadel.team3.backend.services.impl;

import java.util.*;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.ActivityQueries;
import com.exadel.team3.backend.dao.projections.ActivityProjection;
import com.exadel.team3.backend.dto.ActivityType;
import com.exadel.team3.backend.dao.SolutionRepository;
import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.dao.TestRepository;
import com.exadel.team3.backend.dto.ActivityDTO;
import com.exadel.team3.backend.services.StatisticsService;
import org.springframework.util.CollectionUtils;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    @Autowired
    private TestRepository testRepository;
    @Autowired
    private SolutionRepository solutionRepository;
    @Autowired
    private UserRepository userRepository;


   @Override
    public List<ActivityDTO> getActivities(@NonNull LocalDateTime after) {
        LocalDateTime now = LocalDateTime.now();
        List<ActivityDTO> activities = new ArrayList<>();
        List<ActivityProjection> userActivities = userRepository.findRecentActivities(after, now);
        if (!CollectionUtils.isEmpty(userActivities)) {
            activities.addAll(
                    userActivities
                            .stream()
                            .map(
                                    ua ->
                                    new ActivityDTO(
                                            ua.getStart(),
                                            ActivityType.USER_REGISTERED,
                                            ua.getFirstName(),
                                            ua.getLastName(),
                                            null
                                    )
                            )
                            .collect(Collectors.toList())
            );
        }
        activities.addAll(getAssignableActivitiesList(testRepository, after, now));
        activities.addAll(getAssignableActivitiesList(solutionRepository, after, now));
        activities.sort((o1, o2) -> o2.getTime().compareTo(o1.getTime()) );
        return activities;
    }

    private static List<ActivityDTO> getAssignableActivitiesList(ActivityQueries repository,
                                                          LocalDateTime after,
                                                          LocalDateTime now) {
       List<ActivityProjection> activities = repository.findRecentActivities(after, now);
       List<ActivityDTO> results = new ArrayList<>();

       if (CollectionUtils.isEmpty(activities)) return results;
        for (ActivityProjection activity : activities) {
                if (activity.getStart().isAfter(after)) {
                    results.add(new ActivityDTO(
                            activity.getStart(),
                            getActivityType(repository, activity),
                            activity.getFirstName(),
                            activity.getLastName(),
                            activity.getTitle()
                    ));
                }
                if (activity.getDeadline().isAfter(after) && activity.getDeadline().isBefore(now)) {
                    results.add(new ActivityDTO(
                            activity.getStart(),
                            getActivityType(repository, activity),
                            activity.getFirstName(),
                            activity.getLastName(),
                            activity.getTitle()
                    ));
                }
         }
         return results;
    }
    private static ActivityType getActivityType(ActivityQueries repository, ActivityProjection activity) {
       return ActivityType.TASK_SUBMITTED;
    }
}
