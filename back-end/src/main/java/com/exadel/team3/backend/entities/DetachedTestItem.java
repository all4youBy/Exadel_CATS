package com.exadel.team3.backend.entities;


import lombok.AccessLevel;
import lombok.Data;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;

@Data
public class DetachedTestItem {
    @NonNull
    @Setter(AccessLevel.PRIVATE)
    private ObjectId testId;

    @NonNull
    @Setter(AccessLevel.PRIVATE)
    private TestItem testItem;
}
