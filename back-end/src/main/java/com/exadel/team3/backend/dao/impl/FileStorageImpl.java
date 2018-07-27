package com.exadel.team3.backend.dao.impl;

import java.io.FileNotFoundException;
import java.io.InputStream;

import org.bson.BsonObjectId;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import com.mongodb.MongoClient;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import com.mongodb.client.model.Filters;

import com.exadel.team3.backend.dao.FileStorage;

@Component
public class FileStorageImpl implements FileStorage {
    @Autowired
    private MongoClient mongoClient;
    @Autowired
    private Environment env;

    private GridFSBucket bucket;

    @Override
    public ObjectId save(@NonNull InputStream stream, @NonNull String filename) {
        return save(stream, filename, null);
    }
    @Override
    public ObjectId save(@NonNull InputStream stream, @NonNull String filename, ObjectId associatedId) {
        GridFSUploadOptions uploadOptions = new GridFSUploadOptions();
        if (associatedId != null) {
            uploadOptions.metadata(new Document("assocId", new BsonObjectId(associatedId)));
        }
        return getGridFsBucket().uploadFromStream(filename, stream, uploadOptions);
    }

    @Override
    public InputStream read(@NonNull ObjectId fileId) {
        return getGridFsBucket().openDownloadStream(fileId);
    }

    @Override
    public InputStream read(@NonNull String filename,
                            @NonNull ObjectId associatedId) throws FileNotFoundException {
        GridFSFile result = getGridFsBucket().find(Filters.and(
                Filters.eq("filename", filename),
                Filters.eq("metadata.assocId", associatedId.toString())
        )).first();
        if (result == null) throw new FileNotFoundException("File \"" + filename + "\" not found");
        return read(result.getObjectId());
    }

    @Override
    public InputStream read(@NonNull String filename) throws FileNotFoundException {
        GridFSFile result = getGridFsBucket().find(Filters.eq("filename", filename)).first();
        if (result == null) throw new FileNotFoundException("File \"" + filename + "\" not found");
        return read(result.getObjectId());
    }

    @Override
    public void deleteAll() {
        getGridFsBucket().drop();
    }

    private GridFSBucket getGridFsBucket() {
        if (bucket != null) return bucket;
        return bucket = GridFSBuckets.create(
                mongoClient.getDatabase(
                        env.getProperty("spring.data.mongodb.database", "cats")
                ),
                "storage"
        );
    }
}
