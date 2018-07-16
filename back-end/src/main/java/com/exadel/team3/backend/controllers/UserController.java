package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cats")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public void addUser(@RequestBody User user){

    }

    @GetMapping("/users/{group}")
    public List<User> getUsers(@PathVariable String group){
        return userService.getUsersByGroup(group);
    }
}
