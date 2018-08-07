package com.exadel.team3.backend.services.impl;

import java.util.*;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

@Service
public class StatisticsServiceImpl implements StatisticsService {
    @Autowired
    private TestRepository testRepository;
    @Autowired
    private SolutionRepository solutionRepository;
    @Autowired
    private UserRepository userRepository;

    @Value("${cats.activities.historyDepth:30}")
    private int historyDepth;

    @Override
    public List<ActivityDTO> getActivities() {
        return getActivities(null);
    }

    @Override
    public List<ActivityDTO> getActivities(LocalDateTime after) {
        return getActivitiesOfGroups(after, null);
    }

    @Override
    public List<ActivityDTO> getActivitiesOfGroups(@NonNull Collection<String> groups) {
        return getActivitiesOfGroups(null, groups);
    }

    @Override
    public List<ActivityDTO> getActivitiesOfGroups(LocalDateTime after, Collection<String> groups) {
        LocalDateTime now = LocalDateTime.now();
        if (after == null) after = now.minusDays(historyDepth);

        List<ActivityDTO> activities = new ArrayList<>();
        activities.addAll(getUserActivitiesList(after, now, groups));
        activities.addAll(getAssignableActivitiesList(testRepository, after, now, groups));
        activities.addAll(getAssignableActivitiesList(solutionRepository, after, now, groups));
        activities.sort(
                (o1, o2) -> {
                    int comp = o2.getTime().compareTo(o1.getTime());
                    return comp != 0 ? comp : o2.getType().compareTo(o1.getType());
                }
        );
        return activities;
    }

    private List<ActivityDTO> getUserActivitiesList(LocalDateTime after, LocalDateTime now, Collection<String> groups) {
        List<ActivityProjection> activities = userRepository.findRecentActivities(after, now, groups);
        List<ActivityDTO> results = new ArrayList<>();
        if (!CollectionUtils.isEmpty(activities)) {
            results.addAll(
                    activities
                            .stream()
                            .map(
                                    ua ->
                                            new ActivityDTO(
                                                    ua.getStart(),
                                                    ActivityType.USER_REGISTERED,
                                                    ua.getFirstName(),
                                                    ua.getLastName(),
                                                    null,
                                                    null
                                            )
                            )
                            .collect(Collectors.toList())
            );
        }
        return results;
    }

    private static List<ActivityDTO> getAssignableActivitiesList(
            ActivityQueries repository,
            LocalDateTime after,
            LocalDateTime now,
            Collection<String> groups ) {

       List<ActivityProjection> activities = repository.findRecentActivities(after, now, groups);
       List<ActivityDTO> results = new ArrayList<>();

       if (CollectionUtils.isEmpty(activities)) return results;
        for (ActivityProjection activity : activities) {
                if (activity.getStart().isAfter(after)) {
                    results.add(new ActivityDTO(
                            activity.getStart(),
                            getActivityType(repository, activity, true),
                            activity.getFirstName(),
                            activity.getLastName(),
                            repository instanceof TestRepository
                                ? activity.getTitle()
                                : activity.getText(),
                            null
                    ));
                }
                if (activity.getDeadline().isAfter(after) && activity.getDeadline().isBefore(now)) {
                    results.add(new ActivityDTO(
                            activity.getDeadline(),
                            getActivityType(repository, activity, false),
                            activity.getFirstName(),
                            activity.getLastName(),
                            repository instanceof TestRepository
                                ? activity.getTitle()
                                : activity.getText(),
                            activity.getMark()
                    ));
                }
         }
         return results;
    }
    private static ActivityType getActivityType(ActivityQueries repository, ActivityProjection activity, boolean isStart) {
        if (repository instanceof TestRepository) {
            if (isStart) {
                return (!StringUtils.isEmpty(activity.getAssignedBy()))
                        ? ActivityType.CONTROL_TEST_ASSIGNED
                        : ActivityType.TRAINING_TEST_STARTED;
            } else {
                if (!StringUtils.isEmpty(activity.getAssignedBy())) {
                    if (activity.getMark() != null) {
                        return ActivityType.CONTROL_TEST_SUBMITTED;
                    } else {
                        return ActivityType.CONTROL_TEST_CHECK_NEEDED;
                    }
                } else {
                    return ActivityType.TRAINING_TEST_SUBMITTED;
                }
            }
        } else {
            if (isStart) {
                return ActivityType.TASK_ASSIGNED;
            } else {
                return ActivityType.TASK_FINISHED;
            }
        }
    }
}
