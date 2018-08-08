package com.exadel.team3.backend.dto.mappers;

import com.exadel.team3.backend.dto.UniversitiesFacultiesDTO;
import com.exadel.team3.backend.entities.TaxonomyItem;

public class UniversitiesFacultiesDTOMapper {

    public static UniversitiesFacultiesDTO convert(TaxonomyItem item){
        return new UniversitiesFacultiesDTO(item.getTitle(),item.getSubitems());
    }
}
