package com.exadel.team3.backend.security.filters;

import com.exadel.team3.backend.security.SecurityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JWTAuthorizationFilter extends OncePerRequestFilter{

    private SecurityUtils securityUtils;
    private UserDetailsService userDetailsService;
    private static final String HEADER = "Authorization";

    public JWTAuthorizationFilter(SecurityUtils securityUtils,UserDetailsService userDetailsService){
        this.securityUtils = securityUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String header = request.getHeader(HEADER);
        String token = null;
        String email = null;
        String role = null;

        if(header != null && header.startsWith("Bearer ")){
            token = header.substring(7);
            email = securityUtils.getUserFromToken(token);
            role = securityUtils.getUserAuthority(token);

        }

        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,null,  Collections.singletonList(new SimpleGrantedAuthority(role)));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
       chain.doFilter(request,response);
    }
}
