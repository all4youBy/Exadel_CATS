package com.exadel.team3.backend.dao.impl;

import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.entities.Solution;
import org.springframework.stereotype.Repository;

@Repository
public class SolutionRepositoryImpl
        extends AssignableRepositoryImpl<Solution>
        implements AssignableRepositoryAggregation {
    @Override
    protected Class<Solution> getEntityClass() {
        return Solution.class;
    }
}
