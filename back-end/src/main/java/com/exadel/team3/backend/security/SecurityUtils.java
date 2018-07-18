package com.exadel.team3.backend.security;

import com.exadel.team3.backend.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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

        final Date createdDate = new Date();
        final Date expirationDate = calculateExpirationDate(createdDate);
        Map<String, Object> claims = new HashMap<>();

        claims.put("role",user.getRole());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
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

    private Date calculateExpirationDate(Date createdDate){
        return new Date(createdDate.getTime() + expiration * 1000);
    }

    public void hashUserPassword(User user){
        String hashPass = encoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashPass);
    }

}