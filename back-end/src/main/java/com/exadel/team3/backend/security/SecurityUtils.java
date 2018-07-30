package com.exadel.team3.backend.security;

import com.exadel.team3.backend.entities.User;

import com.exadel.team3.backend.services.time.TimeService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;

@Component
public class SecurityUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Getter
    @Value("${jwt.expiration}")
    private Long expiration;


    @Value("${jwt.pass.secret}")
    private String passSecret;

    private final static int PASS_STRING_LENGTH = 10;

    @Autowired
    private PasswordEncoder encoder;

    public String generateToken(AuthenticatedUser user){

        final LocalDateTime createdDate = LocalDateTime.now();
        final LocalDateTime expirationDate = calculateExpirationDate(createdDate);
        Map<String, Object> claims = new HashMap<>();

        claims.put("role",user.getRole());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(TimeService.parseLocalDateTimeToDate(createdDate))
                .setExpiration(TimeService.parseLocalDateTimeToDate(expirationDate))
                .signWith(SignatureAlgorithm.HS256,secret)
                .compact();
    }

    public String getUserFromToken(String token){
        return getClaimFromToken(token,Claims::getSubject);
    }

    public Date getExpirationTimeFromToken(String token){
        return getClaimFromToken(token,Claims::getExpiration);
    }

    public Date getTokenCreateTime(String token){
        return getClaimFromToken(token,Claims::getExpiration);

    }

    private Claims getAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    private <T> T getClaimFromToken (String token, Function<Claims,T> claimResolver){
        Claims claims = getAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String getUserAuthority(String token){
       return getAllClaims(token).get("role",String.class);
    }

    private LocalDateTime calculateExpirationDate(LocalDateTime createdDate){
        return createdDate.plusMinutes(expiration);
    }

//    public void hashUserPassword(User user){
//        String hashPass = encoder.encode(user.getPasswordHash());
//        user.setPasswordHash(hashPass);
//    }

    public String generateUserPassword(){
        String generatedString = generateRandomString(PASS_STRING_LENGTH);
        return encoder.encode(generatedString);
    }

    private String generateRandomString(int length){
        Random random = new Random();

        byte[] bytes = new byte[length];
        random.nextBytes(bytes);

        return new String(bytes, Charset.forName("UTF-8"));
    }
}