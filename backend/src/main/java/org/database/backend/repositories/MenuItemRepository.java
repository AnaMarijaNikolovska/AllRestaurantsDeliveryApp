package org.database.backend.repositories;

import org.database.backend.models.Menu_item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemRepository extends JpaRepository<Menu_item, Integer> {
}
