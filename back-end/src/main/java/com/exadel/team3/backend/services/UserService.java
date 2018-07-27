package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserRole;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService extends CrudService<User, String>{
    User getPasswordHashAndRole(String email);

    List<User> getByGroup(String group);

    List<User> getUsersByRole(UserRole role);

    boolean exists(String email);

    void assignGroup(List<String> emails, String groupId);
}
