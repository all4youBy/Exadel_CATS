package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Topic;
import com.exadel.team3.backend.services.TopicService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Topic> getTopics(){
        return topicService.getItems();
    }

    @GetMapping("/find-by-root-topic-id/{rootId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<Topic> getTopics(@PathVariable(value = "rootId") String rootId){
        return topicService.getTopics(new ObjectId(rootId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTopic(@RequestBody Topic topic){
        Topic top = topicService.addItem(topic);

        if(top == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add topic.");

        return ResponseEntity.status(HttpStatus.OK).body("Topic created.");
    }

    @GetMapping("/{topicId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public Topic getTopic(@PathVariable(value = "topicId") String id){
        return topicService.getItem(new ObjectId(id));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTopic(@RequestBody Topic topic){
        topicService.deleteItem(topic);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateTopic(@RequestBody Topic topic){
        topicService.updateItem(topic);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
