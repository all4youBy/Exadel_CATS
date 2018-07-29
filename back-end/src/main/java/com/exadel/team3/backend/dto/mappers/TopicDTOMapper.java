package com.exadel.team3.backend.dto.mappers;

import java.util.*;
import org.springframework.lang.NonNull;

import com.exadel.team3.backend.dto.TopicDTO;
import com.exadel.team3.backend.entities.Topic;

public class TopicDTOMapper {
    public static List<TopicDTO> transform(@NonNull List<Topic> topics) {
        TopicDTO root = new TopicDTO(null, null);
        topics.forEach(topic -> mergeIntoTopicDTO(root, topic, 0));
        return root.getChildren();
    }

    private static void mergeIntoTopicDTO(TopicDTO ceed, Topic candidate, int level) {
        if (candidate.getParentHierarchy() != null && level < candidate.getParentHierarchy().size()) {
            Optional<TopicDTO> sibling =
                    ceed.getChildren()
                    .stream()
                    .filter(
                            tdto ->
                            tdto.getId().equals(candidate.getParentHierarchy().get(level).getId())
                    ).findFirst();
            if (sibling.isPresent()) {
                mergeIntoTopicDTO(sibling.get(), candidate, level + 1);
            } else {
                mergeIntoTopicDTO(ceed, candidate, level + 1);
            }
        } else {
            ceed.getChildren().add(new TopicDTO(candidate.getId(), candidate.getText()));
        }
    }
}
