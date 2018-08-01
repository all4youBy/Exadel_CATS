package com.exadel.team3.backend.services.impl;

import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.UserRole;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.User;

@Service
public class UserServiceImpl
        extends CrudServiceImpl<User, String>
        implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    protected MongoRepository<User, String> getRepository() {
        return userRepository;
    }

    @Override
    public List<User> getByGroup(@NonNull String group) {
        return userRepository.findStudentsByGroupName(group);
    }

    @Override
    public List<User> getByRole(@NonNull UserRole role) {
        return userRepository.findByRole(role);
    }

    @Override
    public List<String> getGroups() {
        return userRepository.findStudentsGroups();
    }

    @Override
    public List<String> getInstitutions() {
        return userRepository.findInstitutions();
    }

    @Override
    public User getPasswordHashAndRole(@NonNull String email) {
        return userRepository.findPasswordHashAndRole(email);
    }

    @Override
    public boolean exists(@NonNull String email) {
        return userRepository.existsById(email);
    }

    @Override
    public void assignGroup(@NonNull Collection<String> userIds, @NonNull String group) {
        userRepository.addGroup(userIds, group);
    }

    @Override
    public void renameGroup(Collection<String> userIds, @NonNull String oldGroup, @NonNull String newGroup) {
        userRepository.removeGroup(userIds, oldGroup);
        userRepository.addGroup(userIds, newGroup);
    }

    @Override
    public void removeGroup(Collection<String> userIds, String group) {
        userRepository.removeGroup(userIds, group);
    }
}

