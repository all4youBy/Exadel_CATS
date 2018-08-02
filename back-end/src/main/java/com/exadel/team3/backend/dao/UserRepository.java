package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.UserRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.User;

public interface UserRepository extends MongoRepository<User, String>, UserRepositoryQueries {
    User findByEmail(String email);

    List<User> findByEmailIn(Collection<String> emails);

    @Query(value="{'email':?0}", fields="{'_id':0, 'passwordHash':1, 'role':1}")
    User findPasswordHashAndRole(String email);

//    @Query("{'firstName':?0, 'lastName':?1}")
//    List<User> findByFirstAndLastName(String firstName, String lastName);

    @Query("{'groups':?0, 'role':'STUDENT'}")
    List<User> findStudentsByGroupName(String group);

    List<User> findByRole(UserRole role);
}