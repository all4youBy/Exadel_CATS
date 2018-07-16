package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.security.AuthenticationRequest;
import com.exadel.team3.backend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    @Qualifier("userDetailsServiceImpl")
    private UserDetailsService userDetailsService;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request){

        authenticate(request.getUsername(),request.getPassword());

        final UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = securityUtils.generateToken(user);

        return ResponseEntity.ok(token);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    private void authenticate(String email, String password){

        Objects.requireNonNull(email);
        Objects.requireNonNull(password);

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }catch (BadCredentialsException e){
            throw new BadCredentialsException(e.getMessage(),e);
        }
    }
}
