package com.exadel.team3.backend.security.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAnyRole('ADMIN','TEACHER') and request.assignedBy == authentication.name")
public @interface TestGenerationAccess {
}
