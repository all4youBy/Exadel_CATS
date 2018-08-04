package com.exadel.team3.backend.services.impl;

import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;

import com.exadel.team3.backend.dao.AssignableRepository;
import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.Assignable;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.services.AssignableService;
import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.dao.projections.RatingProjection;
import com.exadel.team3.backend.dto.UserRatingDTO;
public abstract class AssignableServiceImpl<T extends Assignable>
        extends CrudServiceImpl<T, ObjectId>
        implements AssignableService<T> {
    @Autowired
    private UserRepository userRepository;
    @Value("${cats.statistics.topRatingListSize:10}")
    private int topRatingListSize;

    @Override
    protected abstract AssignableRepository<T> getRepository();

    protected int getTopRatingListSize() {return topRatingListSize;}

    @Override
    public List<T> getAssignedItems(String assignedTo, String assignedBy) {
        return getRepository().findByAssignedToAndAssignedByOrderByStartDesc(assignedTo, assignedBy);
    }

    @Override
    public List<T> getAssignedItems(String assignedTo) {
        return getRepository().findByAssignedToOrderByStartDesc(assignedTo);
    }
    @Override
    public List<T> getAssignedItemsFinished(String assignedTo) {
        return getRepository().findByAssignedToAndDeadlineBeforeOrderByDeadlineDesc(
                assignedTo,
                LocalDateTime.now()
        );
    }

    @Override
    public List<T> getAssignedItemsUnfinished(String assignedTo) {
        return getRepository().findByAssignedToAndDeadlineAfterOrderByStartDesc(
                assignedTo,
                LocalDateTime.now()
        );
    }

    @Override
    public List<T> getAssignedItemsByAssigner(@NonNull String assignedBy) {
        return getRepository().findByAssignedByOrderByStartDesc(assignedBy);
    }

    @Override
    public List<T> getAssignedItemsToGroup(@NonNull String assignedToGroup) {
        return getRepository().findByAssignedToInOrderByStartDesc(
                getUserIdsByGroupName(assignedToGroup)
        );
    }
    @Override
    public List<T> getAssignedItemsToGroup(@NonNull Collection<String> assignedToIds) {
        return getRepository().findByAssignedToInOrderByStartDesc(assignedToIds);
    }


    @Override
    public List<T> getAssignedItemsToGroupFinished(@NonNull String assignedToGroup) {
        return getRepository()
                .findByAssignedToInAndDeadlineBeforeOrderByDeadlineDesc(
                        getUserIdsByGroupName(assignedToGroup),
                        LocalDateTime.now()
                );
    }
    @Override
    public List<T> getAssignedItemsToGroupFinished(@NonNull Collection<String> assignedToIds) {
        return getRepository()
                .findByAssignedToInAndDeadlineBeforeOrderByDeadlineDesc(
                        assignedToIds,
                        LocalDateTime.now()
                );
    }

    @Override
    public List<T> getAssignedItemsToGroupUnfinished(@NonNull String assignedToGroup) {
        return getRepository()
                .findByAssignedToInAndDeadlineAfterOrderByStartDesc(
                        getUserIdsByGroupName(assignedToGroup),
                        LocalDateTime.now()
                );
    }
    @Override
    public List<T> getAssignedItemsToGroupUnfinished(Collection<String> assignedToIds) {
        return getRepository()
                .findByAssignedToInAndDeadlineAfterOrderByStartDesc(assignedToIds, LocalDateTime.now());
    }

    Stream<String> getUserIdsByGroupNameStream (String group){
        return userRepository.findStudentsByGroupName(group)
                .stream()
                .map(User::getEmail);
    }

    private List<String> getUserIdsByGroupName (String group) {
        return getUserIdsByGroupNameStream(group).collect(Collectors.toList());
    }

    @Override
    public List<UserRatingDTO> getTopRatingBySum() {
        return getTopRating(
                () ->
                ((AssignableRepositoryAggregation)getRepository())
                        .collectRatingBySum(topRatingListSize)
        );
    }

    @Override
    public List<UserRatingDTO> getTopRatingByAverage() {
        return getTopRating(
                () ->
                ((AssignableRepositoryAggregation)getRepository())
                        .collectRatingByAverage(topRatingListSize)
        );
    }

    protected List<UserRatingDTO> getTopRating(Supplier<List<RatingProjection>> collector) {
        return collector.get()
                .stream()
                .map(
                    projection ->
                    new UserRatingDTO(
                            projection.getFirstName(),
                            projection.getLastName(),
                            projection.getRating()
                    )
                )
                .collect(Collectors.toList());
    }


}
