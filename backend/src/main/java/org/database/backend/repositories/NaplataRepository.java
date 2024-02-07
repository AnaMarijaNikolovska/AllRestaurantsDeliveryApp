package org.database.backend.repositories;

import org.database.backend.models.Naplata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NaplataRepository extends JpaRepository<Naplata,Integer> {
}
