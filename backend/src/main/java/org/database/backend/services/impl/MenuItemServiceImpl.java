package org.database.backend.services.impl;

import org.database.backend.models.Menu_item;
import org.database.backend.repositories.MenuItemRepository;
import org.database.backend.services.MenuItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImpl implements MenuItemService {
    private final MenuItemRepository menuItemRepository;

    public MenuItemServiceImpl(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    public List<Menu_item> findAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Override
    public Optional<Menu_item> findMenuItemById(Integer id) {
        return menuItemRepository.findById(id);
    }

    @Override
    public Menu_item saveMenuItem(Menu_item menuItem) {
        Menu_item newMenuItem = new Menu_item();
        newMenuItem.setCena(menuItem.getCena());
        newMenuItem.setIme(menuItem.getIme());
        newMenuItem.setRestoran(menuItem.getRestoran());
        return menuItemRepository.save(menuItem);
    }

    @Override
    public Menu_item editMenuItem(Integer id, Menu_item menuItem) {
        Optional<Menu_item> menuItem1 = findMenuItemById(id);
        if (menuItem1.isPresent()){
            Menu_item updateMenuItem = menuItem1.get();
            updateMenuItem.setCena(menuItem.getCena());
            updateMenuItem.setIme(menuItem.getIme());
            updateMenuItem.setRestoran(menuItem.getRestoran());
            return menuItemRepository.save(updateMenuItem);
        }
        return null;
    }

    @Override
    public void deleteMenuItem(Integer id) {
        menuItemRepository.deleteById(id);
    }
}
