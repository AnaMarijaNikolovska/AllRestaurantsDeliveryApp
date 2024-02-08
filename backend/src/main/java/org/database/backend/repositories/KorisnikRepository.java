package org.database.backend.repositories;

import org.database.backend.models.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik,Integer> {
    Optional<Korisnik> findByUsername(String username);
}
