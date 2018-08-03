package com.exadel.team3.backend.services.impl;

import java.util.Collection;
import java.util.List;

import com.exadel.team3.backend.entities.UserRole;
import com.exadel.team3.backend.services.ServiceException;
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
    public void assignGroup(
            @NonNull Collection<String> students,
            @NonNull String teacher,
            @NonNull String group
    ) {
        User teacherUser = getItem(teacher);
        if (teacherUser != null) {
            teacherUser.getGroups().add(group);
            updateItem(teacherUser);
        };
        userRepository.addGroup(students, group);
    }

    @Override
    public void renameGroup(
            @NonNull Collection<String> students,
            @NonNull String teacher,
            @NonNull String oldGroup,
            @NonNull String newGroup
    ) {
        User teacherUser = getItem(teacher);
        if (teacherUser != null) {
            teacherUser.getGroups().remove(oldGroup);
            teacherUser.getGroups().add(newGroup);
            updateItem(teacherUser);
        }
        userRepository.removeGroup(students, oldGroup);
        userRepository.addGroup(students, newGroup);
    }

    @Override
    public void removeGroup(
            @NonNull Collection<String> students,
            @NonNull String teacher,
            String group
    ) {
        User teacherUser = userRepository.findByEmail(teacher);
        userRepository.removeGroup(students, group);
        if (teacherUser != null) {
            teacherUser.getGroups().remove(group);
            updateItem(teacherUser);
        }
    }
}

