package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.TaggableRepository;
import com.exadel.team3.backend.entities.Taggable;
import com.exadel.team3.backend.services.TaggableService;
import org.bson.types.ObjectId;

import java.util.Collection;
import java.util.List;

public abstract class TaggableServiceImpl<T extends Taggable>
        extends CrudServiceImpl<T, ObjectId>
        implements TaggableService<T> {
    @Override
    protected abstract TaggableRepository<T> getRepository();

    @Override
    public List<T> getItemsByTopicIds(Collection<ObjectId> ids) {
        return getRepository().findByTopicIdsIn(ids);
    }

}
