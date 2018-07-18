package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.TestItem;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.exadel.team3.backend.entities.Test;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Repository
public interface TestRepository extends MongoRepository<Test, ObjectId> {
    List<Test> findByAssignedToOrderByStart(String assignedId);
    List<Test> findByAssignedToInOrderByStart(Collection<String> assignedIds);
    List<Test> findByAssignedToAndAssignedBy(String assignedId, String assignedById);

    @Query("{'assignedBy':?0, 'deadline':{$lte:?1}}")
    List<Test> findNeedingManualCheck(String assignedById, LocalDateTime deadline);
}