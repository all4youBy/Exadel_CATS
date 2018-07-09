package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserRole;

import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(String email, String firstName, String lastName, UserRole role, String passwordHash) {
        try {
            User u = new User(email, firstName, lastName, UserRole.STUDENT, passwordHash);
            return userRepository.insert(u);
        } catch (NullPointerException npe) {
            System.err.println("Incomplete information provided");
            return null;
        } catch (DuplicateKeyException e) {
            System.err.println("Duplicate email provided: " + email);
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public User updateUser(@NonNull User user) {
        try {
            return userRepository.save(user);
        } catch (DataAccessException dae) {
            System.err.println("Could not update user [" + user.getEmail() + "]: " + dae.getMessage());
            return null;
        }
    }

    @Override
    public void deleteUser(@NonNull User user) {
        try {
            userRepository.delete(user);
        } catch (DataAccessException dae) {
            System.err.println("Could not delete user [" + user.getEmail() + "]: " + dae.getMessage());
        }
    }

    @Override
    public User getUser(@NonNull String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getUsersByName(@NonNull String firstName, @NonNull String lastName) {
        return userRepository.findByFirstAndLastName(firstName, lastName);
    }

    @Override
    public List<User> getUsersByGroup(@NonNull String group) {
        return userRepository.findByGroupName(group);
    }

    @Override
    public String getPasswordHash(@NonNull String email) {
        User user = userRepository.findPasswordHash(email);
        return user != null ? user.getPasswordHash() : null;
    }

    @Override
    public boolean userExists(@NonNull String email) {
        return userRepository.findPasswordHash(email) != null;
    }

    @Override
    public void assignGroup(@NonNull String group, @NonNull String... emails) {
        List<User> matchedUsers = userRepository.findByEmailIn(Arrays.asList(emails));
        for (User user : matchedUsers) {
            user.getGroups().add(group);
        }
        userRepository.saveAll(matchedUsers);
    }
}

