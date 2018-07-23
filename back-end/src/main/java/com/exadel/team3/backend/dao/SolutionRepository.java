package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.exadel.team3.backend.entities.Solution;


@Repository
public interface SolutionRepository extends MongoRepository<Solution, ObjectId> {
}