package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.RegistrationRequest;
import com.exadel.team3.backend.dto.AuthenticateDTO;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserAffiliation;
import com.exadel.team3.backend.security.AuthenticatedUser;
import com.exadel.team3.backend.controllers.requests.AuthenticationRequest;
import com.exadel.team3.backend.security.SecurityUtils;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @PostMapping(value = "/login",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request){

        authenticate(request.getUsername(),request.getPassword());

        final UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = securityUtils.generateToken((AuthenticatedUser)user);

        return ResponseEntity.ok(new AuthenticateDTO(token,userService.getItem(user.getUsername()),securityUtils));
    }

    @PostMapping(value = "/registration",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signUpUser(@RequestBody RegistrationRequest request){
//        securityUtils.hashUserPassword(user);
        //TODO password generator
        String userPassword = securityUtils.generateUserPassword();
        UserAffiliation userAffiliation = new UserAffiliation(
                request.getInstitution(),
                request.getFaculty(),
                request.getYearTermination(),
                "",
                request.getPrimarySkill());

        User user = new User(
                request.getEmail(),
                request.getFirstName(),
                request.getSecondName(),
                request.getUserRole(),userPassword);

        user.setAffiliation(userAffiliation);
        userService.addItem(user);
        return ResponseEntity.status(HttpStatus.OK).body("User created.");
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
