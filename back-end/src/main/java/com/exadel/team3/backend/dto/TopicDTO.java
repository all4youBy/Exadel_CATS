package com.exadel.team3.backend.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import lombok.*;

@Data
public class TopicDTO {
    @JsonSerialize(using = ToStringSerializer.class)
    @JsonProperty("value")
    private final ObjectId id;

    @JsonProperty("label")
    private final String text;

    private final List<TopicDTO> children = new ArrayList<>();
}
