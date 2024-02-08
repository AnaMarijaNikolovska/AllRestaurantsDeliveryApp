package org.database.backend.services;

import org.database.backend.models.Menu_item;
import org.database.backend.models.Naplata;

import java.util.List;
import java.util.Optional;

public interface MenuItemService {
    List<Menu_item> findAllMenuItems();
    Optional<Menu_item> findMenuItemById(Integer id);
//    List<Menu_item> findMenuItemsByRestoran();
    Menu_item saveMenuItem(Menu_item menuItem);
    Menu_item editMenuItem(Integer id, Menu_item menuItem);
    void deleteMenuItem(Integer id);
}
