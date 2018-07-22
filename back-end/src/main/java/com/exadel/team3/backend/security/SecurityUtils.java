package com.exadel.team3.backend.security;

import com.exadel.team3.backend.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Component
public class SecurityUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

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
                .setIssuedAt(parseTimeToDate(createdDate))
                .setExpiration(parseTimeToDate(expirationDate))
                .signWith(SignatureAlgorithm.HS256,secret)
                .compact();
    }

    public String getUserFromToken(String token){
        return getAllClaims(token).getSubject();
    }

    private Claims getAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUserAuthority(String token){
       return getAllClaims(token).get("role",String.class);
    }

    private LocalDateTime calculateExpirationDate(LocalDateTime createdDate){
        return createdDate.plusMinutes(expiration);
    }

    private Date parseTimeToDate(LocalDateTime time){
        return Date.from(time.atZone(ZoneId.systemDefault()).toInstant());
    }
    public void hashUserPassword(User user){
        String hashPass = encoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashPass);
    }
}