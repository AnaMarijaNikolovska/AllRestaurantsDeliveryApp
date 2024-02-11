package org.database.backend.repositories;

import org.database.backend.models.responses.CustomUserDetails;
import org.database.backend.models.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Integer> {
    @Query("SELECT " +
            "new org.database.backend.models.responses.CustomUserDetails(k.id, k.email, k.username, k.password, " +
            "CAST(CASE " +
            "WHEN m.id IS NOT NULL THEN org.database.backend.models.enums.Role.MANAGER " +
            "WHEN a.id IS NOT NULL THEN org.database.backend.models.enums.Role.ADMIN " +
            "WHEN p.id IS NOT NULL THEN org.database.backend.models.enums.Role.USER " +
            "WHEN v.id IS NOT NULL THEN org.database.backend.models.enums.Role.DRIVER " +
            "ELSE org.database.backend.models.enums.Role.Unknown " +
            "END AS org.database.backend.models.enums.Role), " +
            "COALESCE(m.id, a.id, p.id, v.id ), " +
            "p.address, " +
            "p.phoneNumber) " +
            "FROM Korisnik k " +
            "LEFT JOIN Manager m ON k.id = m.korisnik.id " +
            "LEFT JOIN Administrator a ON a.korisnik.id = k.id " +
            "LEFT JOIN Potrosuvac p ON p.korisnik.id = k.id " +
            "LEFT JOIN Vozac v ON v.korisnik.id = k.id " +
            "WHERE k.username = :username")
    Optional<CustomUserDetails> findByUsername(String username);

    @Query("SELECT " +
            "new org.database.backend.models.responses.CustomUserDetails(k.id, k.email, k.username, k.password, " +
            "CAST(CASE " +
            "WHEN m.id IS NOT NULL THEN org.database.backend.models.enums.Role.MANAGER " +
            "WHEN a.id IS NOT NULL THEN org.database.backend.models.enums.Role.ADMIN " +
            "WHEN p.id IS NOT NULL THEN org.database.backend.models.enums.Role.USER " +
            "WHEN v.id IS NOT NULL THEN org.database.backend.models.enums.Role.DRIVER " +
            "ELSE org.database.backend.models.enums.Role.Unknown " +
            "END AS org.database.backend.models.enums.Role), " +
            "COALESCE(m.id, a.id, p.id, v.id ), " +
            "p.address, " +
            "p.phoneNumber) " +
            "FROM Korisnik k " +
            "LEFT JOIN Manager m ON k.id = m.korisnik.id " +
            "LEFT JOIN Administrator a ON a.korisnik.id = k.id " +
            "LEFT JOIN Potrosuvac p ON p.korisnik.id = k.id " +
            "LEFT JOIN Vozac v ON v.korisnik.id = k.id " +
            "WHERE k.id = :id")
    Optional<CustomUserDetails> findUserById(Integer id);
}
