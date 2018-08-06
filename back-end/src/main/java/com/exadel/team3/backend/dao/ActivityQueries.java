package com.exadel.team3.backend.dao;

import java.time.LocalDateTime;
import java.util.List;

import com.exadel.team3.backend.dao.projections.ActivityProjection;

public interface ActivityQueries {
    List<ActivityProjection> findRecentActivities(LocalDateTime after, LocalDateTime now);
}
