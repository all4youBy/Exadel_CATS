package com.exadel.team3.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class SolutionController {
    @PostMapping("/solution")
    public ResponseEntity<?> addSolution(@RequestParam("files") MultipartFile... files) {
        for (MultipartFile file : files) {

        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Solution added");
    }


}
