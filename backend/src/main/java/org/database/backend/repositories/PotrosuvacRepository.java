package org.database.backend.repositories;

import org.database.backend.models.Potrosuvac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PotrosuvacRepository extends JpaRepository<Potrosuvac,Integer> {
    Optional<Potrosuvac> findByKorisnikId(Integer id);
}
