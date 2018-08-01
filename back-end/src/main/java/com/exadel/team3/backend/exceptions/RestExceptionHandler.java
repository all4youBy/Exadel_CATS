package com.exadel.team3.backend.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler{

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthenticationException(AuthenticationException e, WebRequest request){
        return handleExceptionInternal(e,e.getMessage(),new HttpHeaders(),HttpStatus.UNAUTHORIZED,request);
    }

//    @ExceptionHandler(RuntimeException.class)
//    private ResponseEntity<?> handleRuntimeException(RuntimeException e,WebRequest request){
//        return handleExceptionInternal(e,e.getMessage(),new HttpHeaders(),HttpStatus.CONFLICT,request);
//    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return handleExceptionInternal(ex,ex.getMessage(),headers,status,request);
    }
}
