package org.database.backend.services.impl;

import org.database.backend.models.Korisnik;
import org.database.backend.models.Manager;
import org.database.backend.models.Potrosuvac;
import org.database.backend.models.Vozac;
import org.database.backend.models.dto.UserDto;
import org.database.backend.models.dto.UserLoginDto;
import org.database.backend.models.enums.Role;
import org.database.backend.models.responses.CustomUserDetails;
import org.database.backend.repositories.*;
import org.database.backend.services.KorisnikService;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class KorisnikServieImpl implements KorisnikService {
    private final KorisnikRepository korisnikRepository;
    private final AdminRepository adminRepository;
    private final ManagerRepository managerRepository;
    private final PotrosuvacRepository potrosuvacRepository;
    private final VozacRepository vozacRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public KorisnikServieImpl(KorisnikRepository korisnikRepository, AdminRepository adminRepository, ManagerRepository managerRepository, PotrosuvacRepository potrosuvacRepository, VozacRepository vozacRepository, BCryptPasswordEncoder passwordEncoder) {
        this.korisnikRepository = korisnikRepository;
        this.adminRepository = adminRepository;
        this.managerRepository = managerRepository;
        this.potrosuvacRepository = potrosuvacRepository;
        this.vozacRepository = vozacRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Korisnik> findAll() {
        return korisnikRepository.findAll();
    }

    @Override
    public Optional<CustomUserDetails> findById(Integer id) throws Exception {
        return korisnikRepository.findUserById(id);
    }

    @Override
    public List<Manager> findAllManagersWithoutRestourants() {
        return managerRepository.findALlManagersWithoutRestourants();
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUserDetails user = korisnikRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username is not Found."));

        AuthorityUtils.createAuthorityList(String.valueOf(user.getRole()));
        return user;
    }

    @Transactional
    @Override
    public Integer save(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        Korisnik korisnik = new Korisnik(userDto.getEmail(), userDto.getUsername(), passwordEncoder.encode(userDto.getPassword()));
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

    @Transactional
    @Override
    public void update(Integer id, UserDto userDto) throws Exception {
        Korisnik korisnik = korisnikRepository.findById(id).orElseThrow(() -> new Exception("Not found"));
        korisnik.setUsername(userDto.getUsername());
        korisnik.setEmail(userDto.getEmail());

        if (korisnik.getRole() == Role.USER) {
            Potrosuvac potrosuvac = potrosuvacRepository
                    .findByKorisnikId(korisnik.getId()).orElseThrow(() -> new Exception("Not found"));

            potrosuvac.setAddress(userDto.getAddress());
            potrosuvac.setPhoneNumber(userDto.getPhoneNumber());

            potrosuvacRepository.save(potrosuvac);
        }

        korisnikRepository.save(korisnik);
    }

    @Override
    public CustomUserDetails loginUser(UserLoginDto userLoginDto) throws Exception {
        if (userLoginDto.getUsername().isEmpty() || userLoginDto.getPassword().isEmpty()) {
            throw new Exception("Invalid request");
        }

        return loadUserByUsername(userLoginDto.getUsername());
    }
}
