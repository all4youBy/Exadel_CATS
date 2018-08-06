package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Test;

public interface TestRepository
        extends AssignableRepository<Test>,
        TestRepositoryAggregation,
        AssignableRepositoryAggregation {

/*
    @Query("{'assignedBy':?0, 'deadline':{$lte:?1}, 'items.status':'UNCHECKED'}")
    List<Test> findNeedingManualCheck(String assignedById, LocalDateTime deadline);
*/
}