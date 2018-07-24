package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.Test;

@Repository
public interface TestRepository extends AssignableRepository<Test> {
    @Query("{'assignedBy':?0, 'deadline':{$lte:?1}, 'items.status':'UNCHECKED'}")
    List<Test> findNeedingManualCheck(String assignedById, LocalDateTime deadline);
}