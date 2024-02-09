package org.database.backend.services.impl;

import org.database.backend.models.Korisnik;
import org.database.backend.models.Potrosuvac;
import org.database.backend.models.Vozac;
import org.database.backend.models.dto.UserDto;
import org.database.backend.models.dto.UserLoginDto;
import org.database.backend.models.enums.Role;
import org.database.backend.repositories.*;
import org.database.backend.services.KorisnikService;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class KorisnikServieImpl implements KorisnikService {
    private final KorisnikRepository korisnikRepository;
    private final AdminRepository adminRepository;
    private final ManagerRepository managerRepository;
    private final PotrosuvacRepository potrosuvacRepository;
    private final VozacRepository vozacRepository;

    public KorisnikServieImpl(KorisnikRepository korisnikRepository, AdminRepository adminRepository, ManagerRepository managerRepository, PotrosuvacRepository potrosuvacRepository, VozacRepository vozacRepository) {
        this.korisnikRepository = korisnikRepository;
        this.adminRepository = adminRepository;
        this.managerRepository = managerRepository;
        this.potrosuvacRepository = potrosuvacRepository;
        this.vozacRepository = vozacRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Korisnik user = korisnikRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username is not Found."));

        AuthorityUtils.createAuthorityList(String.valueOf(user.getRole()));
        return user;
    }

    @Override
    public Integer save(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        Korisnik korisnik = new Korisnik(userDto.getEmail(), userDto.getUsername(), userDto.getPassword());
        korisnikRepository.save(korisnik);

        switch (userDto.getRole()) {
            case DRIVER: {

                Vozac vozac = new Vozac();
                vozac.setKorisnik(korisnik);

                vozacRepository.save(vozac);
                break;
            }
            case USER: {
                Potrosuvac potrosuvac = new Potrosuvac();
                potrosuvac.setKorisnik(korisnik);
                potrosuvac.setAddress(userDto.getAddress());
                potrosuvac.setPhoneNumber(userDto.getPhoneNumber());

                potrosuvacRepository.save(potrosuvac);
                break;
            }
        }

        return korisnik.getId();
    }

    @Override
    public UserDetails loginUser(UserLoginDto userLoginDto) throws Exception {
        if (userLoginDto.getUsername().isEmpty() || userLoginDto.getPassword().isEmpty()) {
            throw new Exception("Invalid request");
        }

        return loadUserByUsername(userLoginDto.getUsername());
    }
}
