package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);

    @Query(value="{'email':?0}", fields="{'_id':0, 'passwordHash':1}")
    User findPasswordHash(String email);

    @Query("{'firstName':?0, 'lastName':?1}")
    List<User> findByFirstAndLastName(String firstName, String lastName);

    @Query("{'groups':?0}")
    List<User> findByGroupName(String group);
}