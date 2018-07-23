package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService extends CrudService<User, String>{
    User getPasswordHashAndRole(String email);

    List<User> getByGroup(String group);

    boolean exists(String email);

    void assignGroup(List<String> emails, String groupId);
}
