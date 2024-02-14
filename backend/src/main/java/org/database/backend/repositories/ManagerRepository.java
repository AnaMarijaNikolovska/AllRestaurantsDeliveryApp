package org.database.backend.repositories;

import org.database.backend.models.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {
    @Query(value = " SELECT m FROM Manager m " +
            "LEFT JOIN Restoran r ON m.id = r.manager.id " +
            "WHERE r.id IS NULL ")
    List<Manager> findALlManagersWithoutRestourants();
}
