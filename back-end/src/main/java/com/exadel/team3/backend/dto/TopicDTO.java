package com.exadel.team3.backend.dto;

import java.util.List;

import com.exadel.team3.backend.dto.mappers.TopicDTOSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.bson.types.ObjectId;
import lombok.*;

@Data
@JsonSerialize(using = TopicDTOSerializer.class)
public class TopicDTO {
    @JsonProperty("value")
    private final ObjectId id;

    @JsonProperty("label")
    private final String text;

    private List<TopicDTO> children;
}
