package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Task;
import com.exadel.team3.backend.security.annotations.AdminAndTeacherAccess;
import com.exadel.team3.backend.services.TaskService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;

    @PostMapping(value = "/add",produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAndTeacherAccess
    public ResponseEntity<?> addQuestion(@RequestBody Task task){
        Task t = taskService.addItem(task);
        if (t == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add question");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Question added");
    }

    @GetMapping("/{taskId}")
    public Task getTest(@PathVariable(value = "taskId") String taskId){
        return taskService.getItem(new ObjectId(taskId));
    }



}
