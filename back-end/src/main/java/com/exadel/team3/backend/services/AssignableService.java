package com.exadel.team3.backend.services;

import com.exadel.team3.backend.dto.UserRatingDTO;
import com.exadel.team3.backend.entities.Assignable;
import org.bson.types.ObjectId;

import java.util.Collection;
import java.util.List;

public interface AssignableService<T extends Assignable> extends CrudService<T, ObjectId> {
    List<T> getAssignedItems(String assignedTo);
    List<T> getAssignedItems(String assignedTo, String assignedBy);
    List<T> getAssignedItemsFinished(String assignedTo);
    List<T> getAssignedItemsUnfinished(String assignedTo);

    List<T> getAssignedItemsByAssigner(String assignedBy);

    List<T> getAssignedItemsToGroup(String assignedToGroup);
    List<T> getAssignedItemsToGroup(Collection<String> assignedToIds);

    List<T> getAssignedItemsToGroupFinished(String assignedToGroup);
    List<T> getAssignedItemsToGroupFinished(Collection<String> assignedToIds);

    List<T> getAssignedItemsToGroupUnfinished(String assignedToGroup);
    List<T> getAssignedItemsToGroupUnfinished(Collection<String> assignedToIds);

    List<UserRatingDTO> getTopRatingBySum();
    List<UserRatingDTO> getTopRatingByAverage();
}
