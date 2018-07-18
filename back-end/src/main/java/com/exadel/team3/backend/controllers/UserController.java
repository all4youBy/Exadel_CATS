package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.security.SecurityUtils;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
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
    public List<User> getUsers(@PathVariable String group){
        return userService.getUsersByGroup(group);
    }
}
