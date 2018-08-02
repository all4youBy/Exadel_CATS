package com.exadel.team3.backend.controllers.requests;

import lombok.Data;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileWrapper {

    @NonNull
    MultipartFile file;

    @NonNull
    String name;

}
