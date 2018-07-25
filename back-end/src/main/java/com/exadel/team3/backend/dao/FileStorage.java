package com.exadel.team3.backend.dao;

import org.bson.types.ObjectId;

import java.io.IOException;
import java.io.InputStream;

public interface FileStorage {
    ObjectId save(InputStream stream, String filename);
    ObjectId save(InputStream stream, String filename, ObjectId associatedId);
    InputStream read(ObjectId fileId);
    InputStream read(String filename, ObjectId associatedId) throws IOException;
    InputStream read(String filename) throws IOException;
    void deleteAll();
}
