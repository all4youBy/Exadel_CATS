package com.exadel.team3.backend.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

@AllArgsConstructor
public class ObjectIdDTO {

    @Setter
    @Getter
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
}
