package com.exadel.team3.backend.services.impl;

import java.util.List;

import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.User;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(@NonNull User user) {
        return userRepository.insert(user);
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

