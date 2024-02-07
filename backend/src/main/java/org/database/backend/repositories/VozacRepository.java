package org.database.backend.repositories;

import org.database.backend.models.Vozac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VozacRepository extends JpaRepository<Vozac,Integer> {
}
