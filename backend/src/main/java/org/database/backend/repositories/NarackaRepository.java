package org.database.backend.repositories;

import org.database.backend.models.Naracka;
import org.database.backend.models.NarackaMenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface NarackaRepository extends JpaRepository<Naracka, Integer> {
}
