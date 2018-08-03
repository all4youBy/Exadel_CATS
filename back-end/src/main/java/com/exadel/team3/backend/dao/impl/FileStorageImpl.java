package com.exadel.team3.backend.dao.impl;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.stream.Stream;

import com.mongodb.client.MongoCursor;
import com.mongodb.client.gridfs.GridFSFindIterable;
import org.bson.BsonObjectId;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    private GridFSBucket bucket;

    @Value("${spring.data.mongodb.database:cats}")
    private String databaseName;

    @Override
    public ObjectId save(@NonNull InputStream stream, @NonNull String filename) {
        return save(stream, filename, null);
    }

    @Override
    public ObjectId save(@NonNull InputStream stream, @NonNull String filename, ObjectId associatedId) {
        MongoCursor<GridFSFile> previouslyStored;
        GridFSUploadOptions uploadOptions = new GridFSUploadOptions();
        if (associatedId != null) {
            uploadOptions.metadata(new Document("assocId", new BsonObjectId(associatedId)));
            previouslyStored = getGridFSFileIterable(filename, associatedId).iterator();
        } else {
            previouslyStored = getGridFSFileIterable(filename).iterator();
        }
        while (previouslyStored.hasNext()) {
            getGridFsBucket().delete(previouslyStored.next().getObjectId());
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
        GridFSFile result = getGridFSFileIterable(filename, associatedId).first();
        if (result == null) throw new FileNotFoundException("File \"" + filename + "\" not found");
        return read(result.getObjectId());
    }

    @Override
    public InputStream read(@NonNull String filename) throws FileNotFoundException {
        GridFSFile result = getGridFSFileIterable(filename).first();
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
                mongoClient.getDatabase(databaseName),
                "storage"
        );
    }
    private GridFSFindIterable getGridFSFileIterable(String filename, ObjectId associatedId) {
        return getGridFsBucket().find(Filters.and(
                Filters.eq("filename", filename),
                Filters.eq("metadata.assocId", associatedId)
        ));
    }
    private GridFSFindIterable getGridFSFileIterable(String filename) {
        return getGridFsBucket().find(Filters.eq("filename", filename));
    }
}
