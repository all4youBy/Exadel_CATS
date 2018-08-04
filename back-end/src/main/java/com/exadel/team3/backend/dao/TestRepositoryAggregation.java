package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.dao.impl.TestItemProjection;
import java.util.List;

public interface TestRepositoryAggregation {
    List<TestItemProjection> findNeedingManualCheck(String assignedById);
}
