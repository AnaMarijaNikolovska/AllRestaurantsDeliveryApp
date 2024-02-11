package org.database.backend.services;

import org.database.backend.models.MenuItem;
import org.database.backend.models.dto.MenuItemDto;

import java.util.List;
import java.util.Optional;

public interface MenuItemService {
    List<MenuItem> findAllMenuItems();
    Optional<MenuItem> findMenuItemById(Integer id);
//    List<Menu_item> findMenuItemsByRestoran();
    Integer saveMenuItem(MenuItemDto menuItem) throws Exception;
    void editMenuItem(Integer id, MenuItemDto menuItem) throws Exception;
    void deleteMenuItem(Integer id);
}
