package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.entities.Topic;
import com.exadel.team3.backend.services.TopicService;
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
        return topicService.getTopics();
    }

    @GetMapping("/{rootId}")
    public List<Topic> getTopics(@PathVariable(value = "rootId") String rootId){
        return topicService.getTopics(rootId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTopic(@RequestBody Topic topic){
        Topic top = topicService.addTopic(topic);

        if(top == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't add topic.");

        return ResponseEntity.status(HttpStatus.OK).body("Topic created.");
    }

    @GetMapping("/topic/{topicId}")
    public Topic getTopic(@PathVariable(value = "topicId") String id){
        return topicService.getTopic(id);
    }

    @DeleteMapping("/topic")
    public void deleteTopic(@RequestBody Topic topic){
        topicService.deleteTopic(topic);
    }

    @PutMapping("/topic")
    public ResponseEntity<?> updateTopic(@RequestBody Topic topic){
        topicService.updateTopic(topic);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
