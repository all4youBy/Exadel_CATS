package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.services.CrudService;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public abstract class CrudServiceImpl<T, I> implements CrudService<T, I> {
    protected abstract MongoRepository<T, I> getRepository();

    @Override
    public T addItem(@NonNull T item) {
        return getRepository().insert(item);
    }

    @Override
    public T getItem(@NonNull I id) {
        return getRepository().findById(id).orElse(null);
    }

    @Override
    public List<T> getItems() {
        return getRepository().findAll();
    }

    @Override
    public Iterable<T> getItems(Iterable<I> ids) {
        return getRepository().findAllById(ids);
    }

    @Override
    public T updateItem(@NonNull T item) {
        return getRepository().save(item);
    }

    @Override
    public void deleteItem(@NonNull T item) {
        getRepository().delete(item);
    }
}
