package com.exadel.team3.backend.dao;

import com.exadel.team3.backend.entities.Paper;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperRepository extends TaggableRepository<Paper> {
}