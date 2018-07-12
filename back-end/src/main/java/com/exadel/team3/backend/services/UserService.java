package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserAuth;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User addUser(User user);

    User getUser(String email);
    UserAuth getPasswordHashAndRole(String email);

//  List<User> getUsersByName(String firstName, String lastName);
    List<User> getUsersByGroup(String group);

    User updateUser(User user);

    void deleteUser(User user);

    boolean userExists(String email);

    void assignGroup(List<String> emails, String groupId);
}
