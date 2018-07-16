package com.exadel.team3.backend.security.filters;

import com.exadel.team3.backend.security.SecurityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.exadel.team3.backend.security.SecurityConstants.HEADER;


public class JWTAuthorizationFilter extends OncePerRequestFilter{

    private SecurityUtils securityUtils;
    private UserDetailsService userDetailsService;

    public JWTAuthorizationFilter(SecurityUtils securityUtils,UserDetailsService userDetailsService){
        this.securityUtils = securityUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String header = request.getHeader(HEADER);
        String token = null;
        String email = null;

        if(header != null && header.startsWith("Bearer ")){
            token = header.substring(7);
            email = securityUtils.getUserFromToken(token);
        }

        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails.getUsername(),null,userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

       chain.doFilter(request,response);
    }

//    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request){
//        String token = request.getHeader(HEADER);
//
//        if(token == null)
//            return null;
//      return securityUtils.getAuthentication(token);
//    }

}
