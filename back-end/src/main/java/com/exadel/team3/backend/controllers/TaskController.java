package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.TaskAttemptRequest;
import com.exadel.team3.backend.controllers.requests.TaskRequest;
import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.entities.TaskTestingSet;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TaskService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;
    @Autowired
    SolutionService solutionService;

    @PostMapping("/add-task")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> addTask(@RequestBody Task task){
        Task t = taskService.addItem(task);
        if (t == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add task");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Task added");
    }

    @GetMapping("/{taskId}")
    public Task getTask(@PathVariable(value = "taskId") String taskId){
        return taskService.getItem(new ObjectId(taskId));
    }

    @DeleteMapping("/delete-task")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTask(@RequestBody Task task){
        taskService.deleteItem(task);
    }

    @PostMapping("/add-solution")
    public ResponseEntity<?> addFilesInSolution(@RequestBody TaskAttemptRequest taskAttemptRequest) {
        Solution solution = solutionService.storeFile(taskAttemptRequest.getSolution(), taskAttemptRequest.getMultipartFile());
        solutionService.submit(solution);
        return new ResponseEntity<>(solution, HttpStatus.OK);
    }

    @PostMapping("/assign-task-for-group")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> assignTaskForGroup(@RequestBody TaskRequest taskRequest) {
        List<Solution> taskForGroup = solutionService.assignSolutionToGroup(
                taskRequest.getId(),
                taskRequest.getAssignedTo(),
                taskRequest.getStart(),
                taskRequest.getDeadline(),
                taskRequest.getAssignedBy());
        if(taskForGroup == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't assign task for group.");
        }

        return new ResponseEntity<>(taskForGroup, HttpStatus.OK);
    }

    @GetMapping("/tasks")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Task> getTasks() {
        return taskService.getItems();
    }

    @PostMapping("/assign-task-for-user")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> assignTaskForUser(@RequestBody TaskRequest taskRequest) {
        Solution solutionForUser = solutionService.assignSolutionToUser(
                taskRequest.getId(),
                taskRequest.getAssignedTo(),
                taskRequest.getStart(),
                taskRequest.getDeadline(),
                taskRequest.getAssignedBy());
        if(solutionForUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't assign task for user.");
        }

        return new ResponseEntity<>(solutionForUser, HttpStatus.OK);
    }

    @GetMapping("/users-tasks/{userId}")
    //TODO Максим напишет аннотацию. Доступ имеет админ, учитель и только один ученик
    public List<Solution> getUsersSolutions(@PathVariable(value = "userId") String userId) {
        return solutionService.getAssignedItems(userId);
    }

    @GetMapping("/testing-sets/{taskId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<TaskTestingSet> getTaskTestingSets(@PathVariable(value = "taskId") String taskId) {
        return taskService.getItem(new ObjectId(taskId)).getTestingSets();
    }

    @GetMapping("/users-task/{usersId}/{taskId}")
    //TODO Максим напишет аннотацию. Доступ имеет админ, учитель и только один ученик
    public Solution getUsersSolution(@PathVariable(value = "taskId") String taskId, @PathVariable(value = "usersId") String usersId) {
        return solutionService.getAssignedItems(usersId).stream().filter(
                o1 -> o1.getId().equals(new ObjectId(taskId)))
                .findFirst().get();
    }

    @PutMapping("/add-testing-set/{taskId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> addTestingSets(@PathVariable(value = "taskId") String taskId, @RequestBody TaskTestingSet set) {
        List<TaskTestingSet> taskTestingSets = taskService.getItem(new ObjectId(taskId)).getTestingSets();

        if (taskTestingSets.add(set)) {
            return new ResponseEntity<>(taskTestingSets, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add tasks set.");
        }

    }
}
