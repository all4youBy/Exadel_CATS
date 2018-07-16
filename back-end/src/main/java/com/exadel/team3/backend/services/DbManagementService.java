package com.exadel.team3.backend.services;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

public interface DbManagementService {
    void reset();
    boolean resetAndFillWithSampleData();
}
