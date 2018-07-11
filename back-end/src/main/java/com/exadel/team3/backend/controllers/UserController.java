package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cats")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add/user")
    public void addUser(@RequestParam(value = "email")String name,
                        @RequestParam(value = "firstname")String firstName,
                        @RequestParam(value = "lastname")String lastName){

    }
}
