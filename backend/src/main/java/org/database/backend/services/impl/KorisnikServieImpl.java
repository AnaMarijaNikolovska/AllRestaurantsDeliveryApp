package org.database.backend.services.impl;

import org.database.backend.models.Korisnik;
import org.database.backend.models.Potrosuvac;
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
}
