package com.exadel.team3.backend.security.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole('ADMIN') or #request.userId == authentication.name")
public @interface TrainingTestGenerationAccess {
}
