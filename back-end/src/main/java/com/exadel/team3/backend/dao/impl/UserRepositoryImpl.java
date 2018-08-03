package com.exadel.team3.backend.dao.impl;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.exadel.team3.backend.dao.UserRepositoryQueries;
import com.exadel.team3.backend.entities.User;

@Repository
public class UserRepositoryImpl implements UserRepositoryQueries {
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<String> findStudentsGroups() {
        return mongoTemplate.aggregate(
                TypedAggregation.newAggregation(
                    Aggregation.unwind("groups", false),
                    Aggregation.match(Criteria.where("role").is("STUDENT").and("groups").ne(null)),
                    Aggregation.group("groups"),
                    Aggregation.sort(Sort.Direction.ASC,"groups")
                ),
                "users",
                StringIdProjectionImpl.class
        ).getMappedResults()
                .stream()
                .map(StringIdProjectionImpl::getId)
                .collect(Collectors.toList());
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
                StringIdProjectionImpl.class
        ).getMappedResults()
                .stream()
                .map(StringIdProjectionImpl::getId).collect(Collectors.toList());
    }

    @Override
    public void addGroup(@NonNull Collection<String> userIds, @NonNull String groupName) {
        Query updateQuery = new Query(
                Criteria.where("email").in(userIds).and("role").is("STUDENT")
        );
        Update update = new Update().addToSet("groups", groupName);
        mongoTemplate.updateMulti(updateQuery, update, User.class);
    }

    @Override
    public void removeGroup(Collection<String> userIds, String groupName) {
        Query updateQuery = new Query(
                Criteria.where("email").in(userIds).and("role").is("STUDENT")
        );
        Update update = new Update().pull("groups", groupName);
        mongoTemplate.updateMulti(updateQuery, update, User.class);
    }
}
