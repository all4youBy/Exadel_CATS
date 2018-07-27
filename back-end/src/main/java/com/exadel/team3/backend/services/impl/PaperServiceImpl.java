package com.exadel.team3.backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exadel.team3.backend.dao.PaperRepository;
import com.exadel.team3.backend.dao.TaggableRepository;
import com.exadel.team3.backend.entities.Paper;
import com.exadel.team3.backend.services.PaperService;

@Service
public class PaperServiceImpl
        extends TaggableServiceImpl<Paper>
        implements PaperService {
    @Autowired
    PaperRepository paperRepository;

    @Override
    protected TaggableRepository<Paper> getRepository() {
        return paperRepository;
    }
}
