package com.exadel.team3.backend.dao;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.exadel.team3.backend.entities.Test;

public interface TestRepository
        extends AssignableRepository<Test>, TestRepositoryAggregation, AssignableRepositoryAggregation {

/*
    @Query("{'assignedBy':?0, 'deadline':{$lte:?1}, 'items.status':'UNCHECKED'}")
    List<Test> findNeedingManualCheck(String assignedById, LocalDateTime deadline);
*/
}