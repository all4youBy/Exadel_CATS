package com.exadel.team3.backend.dto.mappers;

import com.exadel.team3.backend.dto.TopicDTO;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import io.jsonwebtoken.lang.Collections;

import java.io.IOException;

public class TopicDTOSerializer extends StdSerializer<TopicDTO> {
    public TopicDTOSerializer() {
        this(null);
    }
    private TopicDTOSerializer(Class<TopicDTO> t) {
        super(t);
    }

    @Override
    public void serialize(
            TopicDTO topicDTO,
            JsonGenerator jsonGenerator,
            SerializerProvider serializerProvider
    ) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("label", topicDTO.getText());
        jsonGenerator.writeObjectFieldStart("value");
        jsonGenerator.writeStringField("text", topicDTO.getText());
        jsonGenerator.writeStringField("id", topicDTO.getId().toString());
        jsonGenerator.writeEndObject();
        if ( !Collections.isEmpty(topicDTO.getChildren()) ) {
            jsonGenerator.writeArrayFieldStart("children");
            for (TopicDTO tdto : topicDTO.getChildren()) {
                serialize(tdto, jsonGenerator, serializerProvider);
            }
            jsonGenerator.writeEndArray();
        }
        jsonGenerator.writeEndObject();
    }
}
