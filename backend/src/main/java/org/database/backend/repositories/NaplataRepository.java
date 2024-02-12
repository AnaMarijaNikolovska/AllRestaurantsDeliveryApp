package org.database.backend.repositories;

import org.database.backend.models.Naplata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NaplataRepository extends JpaRepository<Naplata, Integer> {
    List<Naplata> findAllByPotrosuvacId(Integer id);
}
