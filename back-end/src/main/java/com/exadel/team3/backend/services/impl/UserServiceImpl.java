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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(@NonNull String email, @NonNull String firstName, @NonNull String lastName, @NonNull UserRole role, @NonNull String passwordHash) {
        try {
            User u = new User(email, firstName, lastName, role, passwordHash);
            return userRepository.insert(u);
        } catch (DuplicateKeyException e) {
            logger.warn("Duplicate email provided for login " + email);
            return null;
        } catch (DataAccessException dae) {
            logger.error("Could not create with email " + email + ": " + dae.getMessage());
            return null;
        }
    }

    @Override
    public User getUser(@NonNull String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(@NonNull User user) {
        try {
            return userRepository.save(user);
        } catch (DataAccessException dae) {
            logger.error("Could not update user with email " + user.getEmail() + ": " + dae.getMessage());
            return null;
        }
    }

    @Override
    public void deleteUser(@NonNull User user) {
        try {
            userRepository.delete(user);
        } catch (DataAccessException dae) {
            logger.error("Could not delete user with email " + user.getEmail() + ": " + dae.getMessage());
        }
    }


    @Override
    public List<User> getUsersByGroup(@NonNull String group) {
        return userRepository.findStudentsByGroupName(group);
    }

    @Override
    public User getPasswordHashAndRole(@NonNull String email) {
        return userRepository.findPasswordHashAndRole(email);
    }

    @Override
    public boolean userExists(@NonNull String email) {
        return userRepository.existsById(email);
    }

    @Override
    public void assignGroup(@NonNull List<String> emails, @NonNull String group) {
        List<User> matchedUsers = userRepository.findByEmailIn(emails);
        for (User user : matchedUsers) {
            user.getGroups().add(group);
        }
        userRepository.saveAll(matchedUsers);
    }
}

