package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.Taggable;
import org.bson.types.ObjectId;

import java.util.Collection;
import java.util.List;

public interface TaggableService<T extends Taggable> extends CrudService<T, ObjectId> {
    List<T> getItemsByTopicIds(Collection<ObjectId> ids);
}
