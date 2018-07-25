package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.dto.AuthenticateDTO;
import com.exadel.team3.backend.security.AuthenticatedUser;
import com.exadel.team3.backend.controllers.requests.AuthenticationRequest;
import com.exadel.team3.backend.security.SecurityUtils;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    @Qualifier("userDetailsServiceImpl")
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityUtils securityUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request){

        authenticate(request.getUsername(),request.getPassword());

        final UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = securityUtils.generateToken((AuthenticatedUser)user);

        return ResponseEntity.ok(new AuthenticateDTO(token,userService.getItem(user.getUsername()),securityUtils));
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
