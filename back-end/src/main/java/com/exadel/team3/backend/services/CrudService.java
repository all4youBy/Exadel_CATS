package com.exadel.team3.backend.services;

import java.util.List;

public interface CrudService<T, I> {
    T addItem(T item);

    T getItem(I id);

    List<T> getItems();
    Iterable<T> getItems(Iterable<I> ids);

    T updateItem(T item);
    void deleteItem(T item);
}
