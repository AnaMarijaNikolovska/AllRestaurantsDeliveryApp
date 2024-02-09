package org.database.backend.services.impl;

import org.database.backend.models.MenuItem;
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
    public List<MenuItem> findAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Override
    public Optional<MenuItem> findMenuItemById(Integer id) {
        return menuItemRepository.findById(id);
    }

    @Override
    public MenuItem saveMenuItem(MenuItem menuItem) {
        MenuItem newMenuItem = new MenuItem();
        newMenuItem.setCena(menuItem.getCena());
        newMenuItem.setIme(menuItem.getIme());
        newMenuItem.setRestoran(menuItem.getRestoran());
        return menuItemRepository.save(menuItem);
    }

    @Override
    public MenuItem editMenuItem(Integer id, MenuItem menuItem) {
        Optional<MenuItem> menuItem1 = findMenuItemById(id);
        if (menuItem1.isPresent()){
            MenuItem updateMenuItem = menuItem1.get();
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
