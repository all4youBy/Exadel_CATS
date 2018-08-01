package com.exadel.team3.backend.services.impl;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.time.LocalDateTime;
import java.util.stream.StreamSupport;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;

import com.exadel.team3.backend.dao.AssignableRepository;
import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.Assignable;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.services.AssignableService;
import com.exadel.team3.backend.dao.AssignableRepositoryAggregation;
import com.exadel.team3.backend.dao.impl.RatingProjectionImpl;
import com.exadel.team3.backend.dto.UserRatingDTO;
public abstract class AssignableServiceImpl<T extends Assignable>
        extends CrudServiceImpl<T, ObjectId>
        implements AssignableService<T> {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Environment env;

    @Override
    protected abstract AssignableRepository<T> getRepository();


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
                ((AssignableRepositoryAggregation)getRepository())::collectRatingBySum
        );
    }

    @Override
    public List<UserRatingDTO> getTopRatingByAverage() {
        return getTopRating(
                ((AssignableRepositoryAggregation)getRepository())::collectRatingByAverage
        );
    }

    private List<UserRatingDTO> getTopRating(Function<Integer, List<RatingProjectionImpl>> collectorFunc) {
        Map<String, Integer> userIdsRatings =
                        collectorFunc.apply(Integer.parseInt(env.getProperty("cats.statistics.topCount", "10")))
                        .stream()
                        .collect(Collectors.toMap(
                                RatingProjectionImpl::getId,
                                RatingProjectionImpl::getRating
                        ));

        return StreamSupport
                .stream(userRepository.findAllById(userIdsRatings.keySet()).spliterator(),false)
                .map(user -> new UserRatingDTO(user.getFirstName(), user.getLastName(), userIdsRatings.get(user.getEmail())))
                .sorted(Comparator.comparingInt(UserRatingDTO::getRating).reversed())
                .collect(Collectors.toList());
    }


}
