package com.exadel.team3.backend.dao.impl;

import com.exadel.team3.backend.dao.FileStorage;
import com.mongodb.MongoClient;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import com.mongodb.client.model.Filters;
import org.bson.BsonObjectId;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.FileNotFoundException;
import java.io.InputStream;

@Component
public class FileStorageImpl implements FileStorage {
    private MongoClient mongoClient;
    private GridFSBucket bucket;

    @Autowired
    private Environment env;

    @PostConstruct
    private void init() {
        mongoClient = new MongoClient(env.getProperty("spring.data.mongodb.host", "localhost"));
    }
    @PreDestroy
    private void cleanUp() {
        mongoClient.close();
    }

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
        return bucket.openDownloadStream(fileId);
    }

    @Override
    public InputStream read(@NonNull String filename, @NonNull ObjectId associatedId) throws FileNotFoundException {
        GridFSFile result = bucket.find(Filters.and(
                Filters.eq("filename", filename),
                Filters.eq("metadata.assocId", associatedId.toString())
        )).first();
        if (result == null) throw new FileNotFoundException("File \"" + filename + "\" not found");
        return read(result.getObjectId());
    }

    @Override
    public InputStream read(@NonNull String filename) throws FileNotFoundException {
        GridFSFile result = bucket.find(Filters.eq("filename", filename)).first();
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
