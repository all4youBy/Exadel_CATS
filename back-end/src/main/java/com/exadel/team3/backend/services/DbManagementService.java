package com.exadel.team3.backend.services;

import org.springframework.stereotype.Service;

public interface DbManagementService {
    void reset();
    void resetAndFillWithSampleData() throws ServiceException;
}
