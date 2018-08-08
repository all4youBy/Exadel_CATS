package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.RegistrationRequest;
import com.exadel.team3.backend.dto.AuthenticateDTO;
import com.exadel.team3.backend.dto.JSONAnswerDTO;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserAffiliation;
import com.exadel.team3.backend.entities.UserRole;
import com.exadel.team3.backend.security.AuthenticatedUser;
import com.exadel.team3.backend.controllers.requests.AuthenticationRequest;
import com.exadel.team3.backend.security.SecurityUtils;
import com.exadel.team3.backend.services.UserService;
import com.exadel.team3.backend.services.mail.mail_sender.MailSender;
import com.exadel.team3.backend.services.mail.mail_types.MailTypes;
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

import java.util.HashMap;
import java.util.Map;
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

    @Autowired
    private MailSender mailSender;

    @PostMapping(value = "/login",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request){

        authenticate(request.getUsername(),request.getPassword());

        final UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = securityUtils.generateToken((AuthenticatedUser)user);

        return ResponseEntity.ok(new AuthenticateDTO(token,userService.getItem(user.getUsername()),securityUtils));
    }

    @PostMapping(value = "/registration",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signUpUser(@RequestBody RegistrationRequest request){
        String[] userPassInfo = securityUtils.generateUserPassword();
        System.out.println(userPassInfo[0]);
        UserAffiliation userAffiliation = new UserAffiliation(
                request.getInstitution(),
                request.getFaculty(),
                request.getYearTermination(),
                "",
                request.getPrimarySkill(),
                request.getJob());

        UserRole userRole = request.getUserRole();

        if(userRole.equals(UserRole.TEACHER) || userRole.equals(UserRole.ADMIN))
            userRole = UserRole.TEACHER_UNCONFIRMED;

        User user = new User(
                request.getEmail(),
                request.getFirstName(),
                request.getSecondName(),
                userRole,
                userPassInfo[1]);

        user.setAffiliation(userAffiliation);
        userService.addItem(user);

        Map<String, String> replaceMap = new HashMap<>();
        replaceMap.put("&login", request.getEmail());
        replaceMap.put("&password", userPassInfo[0]);
        mailSender.send(MailTypes.SEND_LOGIN_AND_PASS, request.getEmail(), replaceMap);

        return ResponseEntity.status(HttpStatus.OK).body(new JSONAnswerDTO("User created."));
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
