package com.exadel.team3.backend.dao.impl;

import org.springframework.stereotype.Repository;

import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.entities.Test;

@Repository
public class TestRepositoryImpl
        extends AssignableRepositoryImpl<Test>
        implements AssignableRepositoryAggregation {
    @Override
    protected Class getEntityClass() {
        return Test.class;
    }
}
