package com.exadel.team3.backend.security.annotations;

import org.springframework.security.access.prepost.PostAuthorize;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@PostAuthorize("hasRole('ADMIN') or #request.email==authentication.name")
public @interface UserAccess {

}
