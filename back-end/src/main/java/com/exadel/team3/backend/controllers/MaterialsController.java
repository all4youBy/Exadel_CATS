package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.dto.PaperDTO;
import com.exadel.team3.backend.entities.Paper;
import com.exadel.team3.backend.services.PaperService;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materials")
public class MaterialsController {

    @Autowired
    private PaperService paperService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/by-topics-ids",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getItemsByTopicsIds(@RequestParam(value = "topicsIds") List<ObjectId> topicsIds){
        return ResponseEntity.ok().body(paperService.getItemsByTopicIds(topicsIds));
    }

    @GetMapping(value = "/by-author/{author}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getItemsByAuthor(@PathVariable String author){
        return ResponseEntity.ok().body(paperService.getItemsByAuthor(author));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllMaterials(){
        return ResponseEntity.ok().body(paperService.getItems());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addMaterials(@RequestBody PaperDTO paperDTO){
        Paper paper = modelMapper.map(paperDTO,Paper.class);
        paperService.addItem(paper);

        return paper == null?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add new material."):
                ResponseEntity.ok().body("Material added.");
    }
}
