package org.database.backend.repositories;

import org.database.backend.models.Vozilo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoziloRepository extends JpaRepository<Vozilo, Integer> {
    Optional<Vozilo> findByVozacId(Integer id);
}
