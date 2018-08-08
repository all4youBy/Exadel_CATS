package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.PaperRequest;
import com.exadel.team3.backend.dto.PaperDTO;
import com.exadel.team3.backend.entities.Paper;
import com.exadel.team3.backend.services.PaperService;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(value = "/by-topic-ids",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMaterialsByTopicsIds(@RequestParam(value = "topic") List<ObjectId> topicsIds){
        return ResponseEntity.ok().body(paperService.getItemsByTopicIds(topicsIds));
    }

    @GetMapping(value = "/by-author/{author}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMaterialsByAuthor(@PathVariable String author){
        return ResponseEntity.ok().body(paperService.getItemsByAuthor(author));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllMaterials(){
        return ResponseEntity.ok().body(paperService.getItems());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addMaterials(@RequestBody PaperRequest request){
        Paper paper = new Paper(request.getTitle(),request.getText(),request.getAuthor());
        paperService.addItem(paper);
        return ResponseEntity.ok().body("Material added.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMaterialById(@PathVariable String id){
        Paper paper = paperService.getItem(new ObjectId(id));
        PaperDTO paperDTO = new PaperDTO(paper.getTitle(),paper.getText(),paper.getAuthor(),paper.getTopicIds());

        return ResponseEntity.ok().body(paperDTO);
    }

    @GetMapping("/by-ids")
    public ResponseEntity<?> getMaterialsByIds(@RequestParam(value = "ids") List<ObjectId> ids){
        return ResponseEntity.ok().body(paperService.getItems(ids));
    }
}
