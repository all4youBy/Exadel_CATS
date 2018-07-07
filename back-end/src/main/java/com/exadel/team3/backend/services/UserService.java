package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entity.User;
import com.exadel.team3.backend.entity.UserRole;

import java.util.List;

public interface UserService {
    User addUser(String email, String firstName, String lastName, UserRole role, String passwordHash);

    User getUser(String email);

    List<User> getUsersByName(String firstName, String lastName);
    List<User> getUsersByGroup(String group);

    User updateUser(User user);

    void deleteUser(User user);

    String getPasswordHash(String email);
}
