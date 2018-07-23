package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.AssignableRepository;
import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.Assignable;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.services.AssignableService;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AssignableServiceImpl<T extends Assignable>
        extends CrudServiceImpl<T, ObjectId>
        implements AssignableService<T> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<T> getAssignedItems(String assignedTo, String assignedBy) {
        return getRepository().findByAssignedToAndAssignedByOrderByStartDesc(assignedTo, assignedBy);
    }

    @Override
    public List<T> getAssignedItems(String assignedTo) {
        return getRepository().findByAssignedToOrderByStartDesc(assignedTo);
    }

    @Override
    public List<T> getAssignedItems(String assignedTo, LocalDateTime deadline, boolean finished) {
        if (finished) {
            return getRepository().findByAssignedToAndDeadlineBeforeOrderByStartDesc(assignedTo, deadline);
        } else {
            return getRepository().findByAssignedToAndDeadlineAfterOrderByStartDesc(assignedTo, deadline);
        }
    }

    @Override
    public List<T> getAssignedItemsToGroup(Collection<String> assignedToIds) {
        return getRepository().findByAssignedToInOrderByStartDesc(assignedToIds);
    }
    @Override
    public List<T> getAssignedItemsToGroup(@NonNull String assignedToGroup) {
        return getRepository().findByAssignedToInOrderByStartDesc(getUserIdsByGroupName(assignedToGroup));
    }


    @Override
    public List<T> getAssignedItemsToGroup(Collection<String> assignedToIds, @NonNull LocalDateTime deadline, boolean finished) {
        if (finished) {
            return getRepository().findByAssignedToInAndDeadlineBeforeOrderByStartDesc(assignedToIds, deadline);
        } else {
            return getRepository().findByAssignedToInAndDeadlineAfterOrderByStartDesc(assignedToIds, deadline);
        }
    }
    @Override
    public List<T> getAssignedItemsToGroup(@NonNull String assignedToGroup, @NonNull LocalDateTime deadline, boolean finished) {
        return getAssignedItemsToGroup(getUserIdsByGroupName(assignedToGroup), deadline, finished);
    }

    @Override
    protected abstract AssignableRepository<T> getRepository();

    protected UserRepository getAssigneeRepository() {
        return userRepository;
    }

    private List<String> getUserIdsByGroupName(String group) {
        return userRepository.findStudentsByGroupName(group)
                .stream()
                .map(User::getEmail)
                .collect(Collectors.toList());
    }
}
