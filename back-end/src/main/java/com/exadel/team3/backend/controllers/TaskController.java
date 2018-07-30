package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.TaskForGroupRequest;
import com.exadel.team3.backend.entities.Solution;
import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TaskService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;
    @Autowired
    SolutionService solutionService;

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody Task task){
        Task t = taskService.addItem(task);
        if (t == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add question");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Question added");
    }

    @GetMapping("/{taskId}")
    public Task getTask(@PathVariable(value = "taskId") String taskId){
        return taskService.getItem(new ObjectId(taskId));
    }

    @DeleteMapping
    public void deleteTask(@RequestBody Task task){
        taskService.deleteItem(task);
    }

    @PostMapping("/solution")
    public ResponseEntity<?> addFilesInSolution(@RequestParam("files") MultipartFile... files) {
        for (MultipartFile file : files) {

        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Files added");
    }

    @PostMapping("/group")
    public ResponseEntity<?> assignTask(@RequestBody TaskForGroupRequest taskRequest) {
        List<Solution> taskForGroup = solutionService.assignSolutionToGroup(
                taskRequest.getId(),
                taskRequest.getGroup(),
                taskRequest.getStart(),
                taskRequest.getDeadline(),
                taskRequest.getAssignedBy());
        if(taskForGroup == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't generate tests for group.");
        }

        return new ResponseEntity<>(taskForGroup, HttpStatus.OK);
    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return taskService.getItems();
    }
}
