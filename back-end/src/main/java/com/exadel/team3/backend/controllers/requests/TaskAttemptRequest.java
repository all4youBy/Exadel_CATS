package com.exadel.team3.backend.controllers.requests;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class TaskAttemptRequest {
    @NotNull
    String usersId;

    @NotNull
    MultipartFile[] multipartFile;
}
