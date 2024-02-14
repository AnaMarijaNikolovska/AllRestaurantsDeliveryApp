package org.database.backend.services;

import org.database.backend.models.Manager;
import org.database.backend.models.responses.CustomUserDetails;
import org.database.backend.models.Korisnik;
import org.database.backend.models.dto.UserDto;
import org.database.backend.models.dto.UserLoginDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface KorisnikService extends UserDetailsService {

    public Integer save(UserDto userDto);

    public void update(Integer id, UserDto userDto) throws Exception;

    public CustomUserDetails loginUser(UserLoginDto userLoginDto) throws Exception;

    public List<Korisnik> findAll();

    public Optional<CustomUserDetails> findById(Integer id) throws Exception;

    public List<Manager> findAllManagersWithoutRestourants();
}
