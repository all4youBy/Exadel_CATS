package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Topic;
import com.exadel.team3.backend.services.TopicService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public List<Topic> getTopics(){
        return topicService.getItems();
    }

    @GetMapping("/{rootId}")
    public List<Topic> getTopics(@PathVariable(value = "rootId") String rootId){
        return topicService.getTopics(new ObjectId(rootId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTopic(@RequestBody Topic topic){
        Topic top = topicService.addItem(topic);

        if(top == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add topic.");

        return ResponseEntity.status(HttpStatus.OK).body("Topic created.");
    }

    @GetMapping("/topic/{topicId}")
    public Topic getTopic(@PathVariable(value = "topicId") String id){
        return topicService.getItem(new ObjectId(id));
    }

    @DeleteMapping("/topic")
    public void deleteTopic(@RequestBody Topic topic){
        topicService.deleteItem(topic);
    }

    @PutMapping("/topic")
    public ResponseEntity<?> updateTopic(@RequestBody Topic topic){
        topicService.updateItem(topic);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
