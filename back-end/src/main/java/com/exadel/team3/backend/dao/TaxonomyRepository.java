package com.exadel.team3.backend.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.exadel.team3.backend.entities.TaxonomyItem;

public interface TaxonomyRepository extends MongoRepository<TaxonomyItem, String> {
    List<TaxonomyItem> findByKeyOrderByTitle(String key);
}
