package org.database.backend.repositories;

import org.database.backend.models.Naracka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NarackaRepository extends JpaRepository<Naracka,Integer> {
}
