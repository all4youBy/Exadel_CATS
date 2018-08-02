package com.exadel.team3.backend.controllers.requests;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class TaskAttemptRequest {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    @Setter(AccessLevel.NONE)
    private ObjectId id;

    @NotNull
    MultipartFile[] multipartFile;
}
