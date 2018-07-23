package com.exadel.team3.backend.entities;

import org.bson.types.ObjectId;

import java.util.List;

public interface Taggable {
    List<ObjectId> getTopicIds();
    void setTopicIds(List<ObjectId> topicIds);

    String getText();
    void setText(String text);
}
