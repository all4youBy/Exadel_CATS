package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.exadel.team3.backend.entities.TaskSolution;


@Repository
public interface SolutionRepository extends MongoRepository<TaskSolution, ObjectId> {
}