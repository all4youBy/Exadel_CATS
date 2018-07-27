package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.User;

import java.util.Collection;
import java.util.List;

public interface UserService extends CrudService<User, String>{
    User getPasswordHashAndRole(String email);

    List<User> getByGroup(String group);

    List<String> getGroups();

    List<String> getInstitutions();

    boolean exists(String email);

    void assignGroup(Collection<String> userIds, String group);
    void removeGroup(Collection<String> userIds, String group);
    void renameGroup(Collection<String> userIds, String oldGroup, String newGroup);
}
