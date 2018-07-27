package com.exadel.team3.backend.services;

import com.exadel.team3.backend.dao.AssignableRepository;
import com.exadel.team3.backend.entities.Assignable;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface AssignableService<T extends Assignable> extends CrudService<T, ObjectId> {
    List<T> getAssignedItems(String assignedTo);
    List<T> getAssignedItems(String assignedTo, String assignedBy);
    List<T> getAssignedItems(String assignedTo, LocalDateTime deadline, boolean finished);

    List<T> getAssignedItemsByAssigner(String assignedBy);

    List<T> getAssignedItemsToGroup(String assignedToGroup);
    List<T> getAssignedItemsToGroup(Collection<String> assignedToIds);
    List<T> getAssignedItemsToGroup(Collection<String> assignedToGroup,
                                    LocalDateTime deadline,
                                    boolean finished);
    List<T> getAssignedItemsToGroup(String assignedToGroup,
                                    LocalDateTime deadline,
                                    boolean finished);
}
