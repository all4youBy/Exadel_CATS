package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Solution;

public interface SolutionRepository
        extends AssignableRepository<Solution>,
        AssignableRepositoryAggregation,
        SolutionRepositoryAggregation {
}