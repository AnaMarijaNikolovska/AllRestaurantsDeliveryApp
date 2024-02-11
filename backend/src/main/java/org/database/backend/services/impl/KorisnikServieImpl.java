package org.database.backend.services.impl;

import org.database.backend.models.*;
import org.database.backend.models.dto.UserDto;
import org.database.backend.models.dto.UserLoginDto;
import org.database.backend.models.enums.Role;
import org.database.backend.models.responses.CustomUserDetails;
import org.database.backend.repositories.*;
import org.database.backend.services.KorisnikService;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Korisnik> findAll() {
        return korisnikRepository.findAll();
    }

    @Override
    public Optional<CustomUserDetails> findById(Integer id) {
        return korisnikRepository.findUserById(id);
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUserDetails user = korisnikRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username is not Found."));

        AuthorityUtils.createAuthorityList(String.valueOf(user.getRole()));
        return user;
    }

    public Integer save(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        Korisnik korisnik = new Korisnik(userDto.getEmail(), userDto.getUsername(), userDto.getPassword());
        korisnikRepository.save(korisnik);

        switch (Role.valueOf(userDto.getRole())) {
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
            case MANAGER: {

                Manager menager = new Manager();
                menager.setKorisnik(korisnik);

                managerRepository.save(menager);
                break;
            }
        }

        return korisnik.getId();
    }

    @Override
    public CustomUserDetails loginUser(UserLoginDto userLoginDto) throws Exception {
        if (userLoginDto.getUsername().isEmpty() || userLoginDto.getPassword().isEmpty()) {
            throw new Exception("Invalid request");
        }

        return loadUserByUsername(userLoginDto.getUsername());
    }
}
