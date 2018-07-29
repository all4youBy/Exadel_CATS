package com.exadel.team3.backend.services;

public interface DbManagementService {
    void reset();
    void resetAndFillWithSampleData() throws ServiceException;
}
