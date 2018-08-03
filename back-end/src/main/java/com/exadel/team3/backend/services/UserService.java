package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserRole;

import java.util.Collection;
import java.util.List;

public interface UserService extends CrudService<User, String>{
    User getPasswordHashAndRole(String email);

    List<User> getByGroup(String group);

    List<User> getByRole(UserRole role);

    List<String> getGroups();

    List<String> getInstitutions();

    boolean exists(String email);

    void assignGroup(Collection<String> students, String teacher, String group);
    void removeGroup(Collection<String> students, String teacher, String group);
    void renameGroup(Collection<String> students, String teacher, String oldGroup, String newGroup);
}
