package com.exadel.team3.backend.dao.impl;

import com.exadel.team3.backend.dao.UserRepositoryQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;
import java.util.stream.Collectors;

public class UserRepositoryImpl implements UserRepositoryQueries {
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<String> findStudentsGroups() {
        return mongoTemplate.aggregate(
                TypedAggregation.newAggregation(
                    Aggregation.match(Criteria.where("role").is("STUDENT")),
                    Aggregation.unwind("groups"),
                    Aggregation.group("groups"),
                    Aggregation.sort(Sort.Direction.ASC,"groups")
                ),
                "users",
                StringIdProjectionObject.class
        ).getMappedResults().stream().map(StringIdProjectionObject::getString).collect(Collectors.toList());
    }

    @Override
    public List<String> findInstitutions() {
        return mongoTemplate.aggregate(
                TypedAggregation.newAggregation(
                        Aggregation.match(Criteria.where("affiliation.institution").ne(null)),
                        Aggregation.project("affiliation.institution"),
                        Aggregation.group("institution")
                ),
                "users",
                StringIdProjectionObject.class
        ).getMappedResults().stream().map(StringIdProjectionObject::getString).collect(Collectors.toList());

    }
}
