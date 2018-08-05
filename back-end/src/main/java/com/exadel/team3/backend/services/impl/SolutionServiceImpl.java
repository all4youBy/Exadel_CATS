package com.exadel.team3.backend.services.impl;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.exadel.team3.backend.dao.*;
import com.exadel.team3.backend.services.ServiceException;
import com.exadel.team3.backend.services.SolutionChecker;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.NonNull;

import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.services.SolutionService;

@Service
public class SolutionServiceImpl
        extends AssignableServiceImpl<Solution>
        implements SolutionService
{
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private FileStorage fileStorage;

    @Autowired
    private SolutionChecker solutionChecker;

    @Override
    protected AssignableRepository<Solution> getRepository() {
        return solutionRepository;
    }

    @Value("${cats.task.defaultDuration:120}")
    private long defaultTaskDuration;

    @Override
    public Solution assignSolutionToUser(
            @NonNull ObjectId taskId,
            @NonNull String userId,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    ) {
        Solution newSolution = new Solution(taskId, userId);
        start = start != null ? start :LocalDateTime.now();
        deadline = deadline != null && deadline.isAfter(start)
                ? deadline
                : start.plus(Duration.ofMinutes(defaultTaskDuration));
        newSolution.setStart(start);
        newSolution.setDeadline(deadline);
        newSolution.setAssignedBy(assignedBy);
        return addItem(newSolution);
    }

    @Override
    public List<Solution> assignSolutionToGroup(
            @NonNull ObjectId taskId,
            @NonNull String group,
            LocalDateTime start,
            LocalDateTime deadline,
            String assignedBy
    ) {
        return getUserIdsByGroupNameStream(group)
                .map(
                      userId ->
                        assignSolutionToUser(taskId, userId, start, deadline, assignedBy)
                )
                .collect(Collectors.toList());
    }

    @Override
    public Solution storeFile(@NonNull Solution solution,
                              @NonNull MultipartFile file) throws ServiceException {
        try (InputStream is = file.getInputStream()) {
            solution = storeFile(solution, is, file.getOriginalFilename());
        } catch (IOException e) {
            throw new ServiceException(String.format("Could not store file %s for solution %s",
                    file.getName(), solution.getId()), e);
        }


        return solution;
    }

    @Override
    public Solution storeFile(@NonNull Solution solution,
                              @NonNull InputStream stream,
                              @NonNull String filename) throws ServiceException{
            if (isValidFileName(filename)) {
                ObjectId fileId = fileStorage.save(stream, filename, solution.getId());
                if (fileId != null) {
                    if (solution.getFiles() != null) {
                        solution.getFiles().add(filename);
                        solution.setFiles(solution.getFiles().stream().distinct().collect(Collectors.toList()));
                    } else {
                        solution.setFiles(Collections.singletonList(filename));
                    }
                }
                return solution;
            } else {
                throw new ServiceException("File \"" + filename + "\" is not valid");
            }
    }

    @Override
    public InputStream getFile(@NonNull Solution solution,
                               @NonNull String filename) throws ServiceException{
        try {
            return fileStorage.read(filename, solution.getId());
        } catch (IOException e) {
            throw new ServiceException(String.format("Could not read file %s for solution %s",
                    filename, solution.getId()), e);
        }
    }


    @Override
    public Solution submit(@NonNull Solution solution) throws ServiceException{
        if (solution.getDeadline().isBefore(LocalDateTime.now())) {
            throw new ServiceException("The solution is pass the deadline");
        }
        solution.setMark(solutionChecker.check(solution));
        return updateItem(solution);
    }

    @Override
    public Solution deleteFiles(@NonNull Solution solution) throws ServiceException {
        List<String> fileNames = solution.getFiles();
        for (String fileName : fileNames) {
            fileStorage.delete(fileName, solution.getId());
        }
        solution.setFiles(new ArrayList<>());
        return solution;
    }

    private static boolean isValidFileName(@NonNull String fileName) {
         return fileName.lastIndexOf(".") > 0
                 && fileName.substring(fileName.lastIndexOf(".")+1).equalsIgnoreCase("java");
    }

}
