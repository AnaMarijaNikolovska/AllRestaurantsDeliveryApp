package org.database.backend.repositories;

import org.database.backend.models.Restoran;
import org.database.backend.models.responses.CustomUserDetails;
import org.database.backend.models.responses.RestorantResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestoranRepository extends JpaRepository<Restoran,Integer> {
    @Query("SELECT " +
            "new org.database.backend.models.responses.RestorantResponse( " +
            "r.id, r.ime, r.lokacija, r.rabotnoVreme, r.manager ) " +
            "FROM Restoran r " +
            "WHERE r.id = :id")
    Optional<RestorantResponse> findRestorantById(Integer id);
}
