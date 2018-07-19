package com.exadel.team3.backend.dao;

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
    List<Test> findByAssignedToOrderByStartDesc(String assignedTo);
    List<Test> findByAssignedToAndDeadlineBeforeOrderByStartDesc(String assignedTo, LocalDateTime deadline);
    List<Test> findByAssignedToAndDeadlineAfterOrderByStartDesc(String assignedTo, LocalDateTime deadline);

    List<Test> findByAssignedToInOrderByStartDesc(Collection<String> assignedIds);
    List<Test> findByAssignedToInAndDeadlineBeforeOrderByStartDesc(Collection<String> assignedIds, LocalDateTime deadline);
    List<Test> findByAssignedToInAndDeadlineAfterOrderByStartDesc(Collection<String> assignedIds, LocalDateTime deadline);

    List<Test> findByAssignedToAndAssignedBy(String assignedId, String assignedById);

    @Query("{'assignedBy':?0, 'deadline':{$lte:?1}, 'items.status':'UNCHECKED'}")
    List<Test> findNeedingManualCheck(String assignedById, LocalDateTime deadline);
}