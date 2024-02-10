package org.database.backend.services;

import org.database.backend.models.CustomUserDetails;
import org.database.backend.models.dto.UserDto;
import org.database.backend.models.dto.UserLoginDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface KorisnikService extends UserDetailsService {

    public Integer save(UserDto userDto);
    public CustomUserDetails loginUser(UserLoginDto userLoginDto) throws Exception;
}
