package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.services.TaxonomyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/info")
public class InfoController {

    @Autowired
    private TaxonomyService taxonomyService;

    @GetMapping(value = "/universities",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getInstitutions(){
        return taxonomyService.getByKey("institutions");
    }

    @GetMapping(value = "/skills",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getPrimarySkills(){
        return taxonomyService.getByKey("skills");
    }

    @GetMapping(value = "/universities/{university}/faculties",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> getFaculties(@PathVariable String university){
        return taxonomyService.getItem(university).getSubitems();
    }

}

