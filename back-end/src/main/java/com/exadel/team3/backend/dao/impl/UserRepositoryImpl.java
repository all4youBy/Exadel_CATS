package com.exadel.team3.backend.dao.impl;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.exadel.team3.backend.dao.ActivityQueries;
import com.exadel.team3.backend.dao.projections.ActivityProjection;
import com.exadel.team3.backend.dao.projections.StringIdProjection;
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
public class UserRepositoryImpl implements UserRepositoryQueries, ActivityQueries {
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
                StringIdProjection.class
        ).getMappedResults()
                .stream()
                .map(StringIdProjection::getId)
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
                StringIdProjection.class
        ).getMappedResults()
                .stream()
                .map(StringIdProjection::getId).collect(Collectors.toList());
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

    @Override
    public List<ActivityProjection> findRecentActivities(@NonNull LocalDateTime after, @NonNull LocalDateTime now) {
        return mongoTemplate.find(
                new Query(Criteria.where("registrationDate").gt(after)),
                User.class
        )
        .stream()
        .map(user -> new ActivityProjection(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                null,
                user.getRegistrationDate(),
                null)
        )
        .collect(Collectors.toList());
    }
}
