package com.exadel.team3.backend.entities;

import java.util.List;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "taxonomies")
public class TaxonomyItem {
    @NonNull
    @Indexed
    private String key;

    @Id
    @NonNull
    private String title;

    private List<String> subitems;
}
