package org.database.backend.services;

import org.database.backend.models.MenuItem;

import java.util.List;
import java.util.Optional;

public interface MenuItemService {
    List<MenuItem> findAllMenuItems();
    Optional<MenuItem> findMenuItemById(Integer id);
//    List<Menu_item> findMenuItemsByRestoran();
    MenuItem saveMenuItem(MenuItem menuItem);
    MenuItem editMenuItem(Integer id, MenuItem menuItem);
    void deleteMenuItem(Integer id);
}
