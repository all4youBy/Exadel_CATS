package com.exadel.team3.backend.services.impl;

import com.exadel.team3.backend.dao.TaxonomyRepository;
import com.exadel.team3.backend.entities.TaxonomyItem;
import com.exadel.team3.backend.services.TaxonomyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaxonomyServiceImpl
        extends CrudServiceImpl<TaxonomyItem, String>
        implements TaxonomyService {

    @Autowired
    private TaxonomyRepository taxonomyRepository;

    @Override
    public List<String> getByKey(@NonNull String key) {
        return taxonomyRepository.findByKeyOrderByTitle(key).stream().map(TaxonomyItem::getTitle).collect(Collectors.toList());
    }

    @Override
    public List<TaxonomyItem> getItemsByKey(@NonNull String key) {
        return taxonomyRepository.findByKeyOrderByTitle(key);
    }

    @Override
    protected MongoRepository<TaxonomyItem, String> getRepository() {
        return taxonomyRepository;
    }
}
