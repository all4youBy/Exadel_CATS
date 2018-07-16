package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.exadel.team3.backend.entities.Test;

import java.util.Collection;
import java.util.List;

@Repository
public interface TestRepository extends MongoRepository<Test, ObjectId> {
    List<Test> findByAssignedToOrderByStart(String assignedId);
    List<Test> findByAssignedToInOrderByStart(List<String> assignedIds);
    List<Test> findByAssignedToAndAssignedBy(String assignedId, String assignedById);
}