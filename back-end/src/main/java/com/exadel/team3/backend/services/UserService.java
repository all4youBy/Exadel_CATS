package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserRole;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User addUser(String email, String firstName, String lastName, UserRole role, String passwordHash);

    User getUser(String email);
    User getPasswordHashAndRole(String email);

//  List<User> getUsersByName(String firstName, String lastName);
    List<User> getUsersByGroup(String group);

    User updateUser(User user);

    void deleteUser(User user);

    boolean userExists(String email);

    void assignGroup(List<String> emails, String groupId);
}
