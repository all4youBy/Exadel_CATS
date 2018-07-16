package com.exadel.team3.backend.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestFilterController {

    @GetMapping("/cats/secure")
    @PreAuthorize("hasRole('ADMIN')")
    public String getString(){
        return "Successes!";
    }

}
