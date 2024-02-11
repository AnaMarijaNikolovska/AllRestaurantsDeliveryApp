package org.database.backend.repositories;

import org.database.backend.models.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {

    List<MenuItem> findAllByRestoranId(Integer restoranId);

    List<MenuItem> findAllByIdIn(List<Integer> ids);
}
