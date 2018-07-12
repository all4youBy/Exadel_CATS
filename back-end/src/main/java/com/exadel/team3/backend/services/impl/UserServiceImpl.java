package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.User;

import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public User addUser(@NonNull User user) {
        try {
            return userRepository.insert(user);
        } catch (DuplicateKeyException e) {
            logger.warn("Tried to register new user with duplicate email " + user.getEmail());
            return null;
        }
    }

    @Override
    public User getUser(@NonNull String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(@NonNull User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(@NonNull User user) {
        userRepository.delete(user);
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

