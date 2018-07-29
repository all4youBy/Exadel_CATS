package com.exadel.team3.backend.dao;

import java.util.Collection;
import java.util.List;

public interface UserRepositoryQueries {
    List<String> findStudentsGroups();
    List<String> findInstitutions();

    void addGroup(Collection<String> userIds, String groupName);
    void removeGroup(Collection<String> userIds, String groupName);
}
