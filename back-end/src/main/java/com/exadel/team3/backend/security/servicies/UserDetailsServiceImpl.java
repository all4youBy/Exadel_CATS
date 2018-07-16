package com.exadel.team3.backend.security.servicies;

import com.exadel.team3.backend.dao.UserRepository;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.security.AuthenticatedUser;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Qualifier("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);

        if(user == null)
            throw new UsernameNotFoundException(String.format("Can't find user with e-mail %s",email));

        return new AuthenticatedUser(user.getEmail(),user.getPasswordHash(),user.getRole().toString());
    }
}
