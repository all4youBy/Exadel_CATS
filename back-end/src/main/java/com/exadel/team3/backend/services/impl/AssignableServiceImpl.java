package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.AssignableRepository;
import com.exadel.team3.backend.entities.Assignable;
import com.exadel.team3.backend.services.AssignableService;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public abstract class AssignableServiceImpl<T extends Assignable>
        extends CrudServiceImpl<T, ObjectId>
        implements AssignableService<T> {

    @Override
    protected abstract AssignableRepository<T> getRepository();

    @Override
    public List<T> getAssignedItems(String assignedTo, String assignedBy) {
        return getRepository().findByAssignedToAndAssignedByOrderByStartDesc(assignedTo, assignedBy);
    }

    @Override
    public List<T> getAssignedItems(String assignedTo) {
        return getRepository().findByAssignedToAndAssignedByOrderByStartDesc(assignedTo, null);
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
    public List<T> getAssignedItemsToGroup(Collection<String> assignedToGroup) {
        return getRepository().findByAssignedToInOrderByStartDesc(assignedToGroup);
    }
    @Override
    public List<T> getAssignedItemsToGroup(Collection<String> assignedToGroup, LocalDateTime deadline, boolean finished) {
        if (finished) {
            return getRepository().findByAssignedToInAndDeadlineBeforeOrderByStartDesc(assignedToGroup, deadline);
        } else {
            return getRepository().findByAssignedToInAndDeadlineAfterOrderByStartDesc(assignedToGroup, deadline);
        }
    }}
