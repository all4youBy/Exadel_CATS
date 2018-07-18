package com.exadel.team3.backend.entities;


import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;

@Data
public class DetachedTestItem {
    @NonNull
    private ObjectId testId;

    @NonNull
    private TestItem testItem;
}
