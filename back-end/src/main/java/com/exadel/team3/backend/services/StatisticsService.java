package com.exadel.team3.backend.services;

import com.exadel.team3.backend.dto.ActivityDTO;
import com.exadel.team3.backend.entities.User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface StatisticsService {
    List<ActivityDTO> getActivities();
    List<ActivityDTO> getActivities(LocalDateTime after);
    List<ActivityDTO> getActivitiesOfGroups(Collection<String> groups);
    List<ActivityDTO> getActivitiesOfGroups(LocalDateTime after, Collection<String> groups);
}
