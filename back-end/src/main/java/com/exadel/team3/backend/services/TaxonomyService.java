package com.exadel.team3.backend.services;

import com.exadel.team3.backend.entities.TaxonomyItem;

import java.util.List;

public interface TaxonomyService extends CrudService<TaxonomyItem, String> {
    List<String> getByKey(String key);
    List<TaxonomyItem> getItemsByKey(String key);
}
