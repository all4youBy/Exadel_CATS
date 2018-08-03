package com.exadel.team3.backend.dto.mappers;

import java.util.*;

import com.exadel.team3.backend.services.TopicService;
import com.exadel.team3.backend.services.impl.TopicServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;

import com.exadel.team3.backend.dto.TopicDTO;
import com.exadel.team3.backend.entities.Topic;

import javax.annotation.PostConstruct;

public class TopicDTOMapper {
    private static TopicService topicService;
    @Autowired
    TopicService topService;
    @PostConstruct
    public void init() {
        TopicDTOMapper.topicService = topService;
    }

    public static List<TopicDTO> transform(@NonNull List<Topic> topics) {
        TopicDTO root = new TopicDTO(null, null);
        topics.forEach(topic -> mergeIntoTopicDTO(root, topic, 0));
        return root.getChildren();
    }

    private static void mergeIntoTopicDTO(TopicDTO ceed, Topic candidate, int level) {
        if (candidate.getParentHierarchy() != null && level < candidate.getParentHierarchy().size()) {
            Optional<TopicDTO> sibling = Optional.empty();
            if (ceed.getChildren() != null) {
                sibling = ceed.getChildren()
                        .stream()
                        .filter(
                                tdto ->
                                        tdto.getId().equals(candidate.getParentHierarchy().get(level).getId())
                        ).findFirst();
            }
            if (sibling.isPresent()) {
                mergeIntoTopicDTO(sibling.get(), candidate, level + 1);
            } else {
                mergeIntoTopicDTO(ceed, candidate, level + 1);
            }
        } else {
            if (ceed.getChildren() == null) ceed.setChildren(new ArrayList<TopicDTO>());
            ceed.getChildren().add(new TopicDTO(candidate.getId(), candidate.getText()));
        }
    }

    public static List<String> transformInToList(List<ObjectId> topicsId) {
        List<String> topics = new ArrayList<>();
        if (topicsId != null) {
            for (ObjectId objectId : topicsId) {
                topics.add(topicService.getItem(objectId).getText());
            }
        }
        return topics;
    }
}
