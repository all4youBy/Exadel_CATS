package com.exadel.team3.backend.controllers.requests;

import com.exadel.team3.backend.entities.Solution;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class TaskAttemptRequest {
    @NotNull
    Solution solution;

    @NotNull
    MultipartFile[] multipartFile;
}
