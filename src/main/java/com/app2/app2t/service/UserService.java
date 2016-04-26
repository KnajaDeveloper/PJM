package com.app2.app2t.service;

// import com.spt.cas.doamin.Simple;
import com.app2.app2t.util.AuthorizeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService implements AuthenticationUserDetailsService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public UserDetails loadUserDetails(Authentication token) throws UsernameNotFoundException {
        logger.debug("-= loadUserDetails [{}]=-",token);

        User user = new User(token.getName(), "password", this.getAuthorities());
        AuthorizeUtil.setUserName(token.getName());
        return user;
    }

    private List<GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
        authList.add(new SimpleGrantedAuthority("ROLE_USER"));
        logger.debug("authList : {}", authList);
        return authList;
    }
}
