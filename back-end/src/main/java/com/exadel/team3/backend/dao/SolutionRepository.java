package com.exadel.team3.backend.dao;

import org.springframework.stereotype.Repository;
import com.exadel.team3.backend.entities.Solution;

public interface SolutionRepository extends AssignableRepository<Solution>, AssignableRepositoryAggregation {
}