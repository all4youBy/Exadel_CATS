package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.TestItem;
import org.bson.types.ObjectId;

import java.util.Collection;
import java.util.List;

public interface TestItemPicker {
    List<TestItem> generate(int count, Collection<ObjectId> topicIds, boolean trainingOnly);
}
