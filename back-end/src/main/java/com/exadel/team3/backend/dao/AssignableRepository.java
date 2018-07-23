package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Assignable;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface AssignableRepository<T extends Assignable> extends MongoRepository<T, ObjectId> {
    List<T> findByAssignedToAndDeadlineBeforeOrderByStartDesc(String assignedTo, LocalDateTime deadline);
    List<T> findByAssignedToInAndDeadlineBeforeOrderByStartDesc(Collection<String> assignedTo, LocalDateTime deadline);
    List<T> findByAssignedToAndDeadlineAfterOrderByStartDesc(String assignedTo, LocalDateTime deadline);
    List<T> findByAssignedToInAndDeadlineAfterOrderByStartDesc(Collection<String> assignedTo, LocalDateTime deadline);

    List<T> findByAssignedToInOrderByStartDesc(Collection<String> assignedIds);

    List<T> findByAssignedToAndAssignedByOrderByStartDesc(String assignedId, String assignedById);
}
