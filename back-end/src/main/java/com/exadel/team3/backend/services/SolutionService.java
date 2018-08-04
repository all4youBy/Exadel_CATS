package com.exadel.team3.backend.services;

import com.exadel.team3.backend.dto.UserRatingDTO;
import com.exadel.team3.backend.entities.Solution;
import org.bson.types.ObjectId;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

public interface SolutionService extends AssignableService<Solution> {
    Solution assignSolutionToUser(
            ObjectId taskId,
            String userId,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    );
    List<Solution> assignSolutionToGroup(
            ObjectId taskId,
            String group,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    );

    Solution storeFile(Solution solution, MultipartFile file) throws ServiceException;
    Solution storeFile(Solution solution, InputStream stream, String filename) throws ServiceException;
    Solution deleteFiles(Solution solution) throws ServiceException;
    InputStream getFile(Solution solution, String filename) throws ServiceException;

    Solution submit(Solution solution) throws ServiceException;

    List<UserRatingDTO> getTopRatingBySum(ObjectId taskId);
    List<UserRatingDTO> getTopRatingByAverage(ObjectId taskId);

}
