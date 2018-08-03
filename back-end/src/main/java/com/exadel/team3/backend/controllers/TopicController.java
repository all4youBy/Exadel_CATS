package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.dto.StringAnswerDTO;
import com.exadel.team3.backend.dto.TopicDTO;
import com.exadel.team3.backend.dto.mappers.TopicDTOMapper;
import com.exadel.team3.backend.entities.Topic;
import com.exadel.team3.backend.security.annotations.AdminAccess;
import com.exadel.team3.backend.security.annotations.AdminAndTeacherAccess;
import com.exadel.team3.backend.services.TopicService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public List<TopicDTO> getTopics(){
        return TopicDTOMapper.transform(topicService.getItems());
    }

    @GetMapping("/find-by-root-topic-id/{rootId}")
    public List<TopicDTO> getTopics(@PathVariable(value = "rootId") String rootId){
        return TopicDTOMapper.transform(topicService.getTopics(new ObjectId(rootId)));
    }

    @GetMapping("/file")
    public ResponseEntity<?> getFile(){
        final ClassLoader classLoader = getClass().getClassLoader();
        InputStream in = classLoader.getResourceAsStream("static/File.txt");
        BufferedReader buf;
        StringBuilder sb  = null;
        try {
            buf = new BufferedReader(new InputStreamReader(in));
            sb = new StringBuilder();
            String str;

            while ((str = buf.readLine()) != null){
                sb.append(str);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().body(sb);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> addTopic(@RequestBody Topic topic){
        Topic top = topicService.addItem(topic);

        if(top == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringAnswerDTO("Can't add topic."));

        return ResponseEntity.status(HttpStatus.OK).body(new StringAnswerDTO("Topic created."));
    }

    @GetMapping("/{topicId}")
    @AdminAndTeacherAccess
    public Topic getTopic(@PathVariable(value = "topicId") String id){
        return topicService.getItem(new ObjectId(id));
    }

    @DeleteMapping
    @AdminAccess
    public void deleteTopic(@RequestBody Topic topic){
        topicService.deleteItem(topic);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> updateTopic(@RequestBody Topic topic){
        topicService.updateItem(topic);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
