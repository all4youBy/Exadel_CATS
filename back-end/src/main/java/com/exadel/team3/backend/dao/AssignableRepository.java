package com.exadel.team3.backend.dao;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.exadel.team3.backend.entities.Assignable;

public interface AssignableRepository<T extends Assignable>
        extends MongoRepository<T, ObjectId> {
    List<T> findByAssignedToAndDeadlineBeforeOrderByDeadlineDesc(String assignedTo, LocalDateTime deadline);
    List<T> findByAssignedToInAndDeadlineBeforeOrderByDeadlineDesc(Collection<String> assignedTo, LocalDateTime deadline);
    List<T> findByAssignedToAndDeadlineAfterOrderByStartDesc(String assignedTo, LocalDateTime deadline);
    List<T> findByAssignedToInAndDeadlineAfterOrderByStartDesc(Collection<String> assignedTo, LocalDateTime deadline);

    List<T> findByAssignedToInOrderByStartDesc(Collection<String> assignedIds);
    List<T> findByAssignedByOrderByStartDesc(String assignedBy);

    List<T> findByAssignedToAndAssignedByOrderByStartDesc(String assignedId, String assignedById);
    List<T> findByAssignedToOrderByStartDesc(String assignedId);
}
