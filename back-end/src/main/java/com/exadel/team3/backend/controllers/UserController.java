package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.security.SecurityUtils;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cats")
public class UserController {

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<?> signUpUser(@RequestBody User user){
        securityUtils.hashUserPassword(user);
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.OK).body("User created.");
    }
    @GetMapping("/users/{group}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<User> getUsers(@PathVariable String group){
        return userService.getUsersByGroup(group);
    }

    @GetMapping("/users/{email}")
    public User getUser(@PathVariable(value = "email") String email){
        return userService.getUser(email);

    }

    @PutMapping("/users")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        userService.updateUser(user);
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @DeleteMapping("/users")
    public void deleteUser(@RequestBody User user){
        userService.deleteUser(user);
    }

    @PostMapping
    public ResponseEntity<?> assignGroup(@RequestBody List<String> emails,String groupId){
        userService.assignGroup(emails,groupId);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
