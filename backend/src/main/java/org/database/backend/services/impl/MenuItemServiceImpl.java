package org.database.backend.services.impl;

import org.database.backend.models.MenuItem;
import org.database.backend.models.Restoran;
import org.database.backend.models.dto.MenuItemDto;
import org.database.backend.repositories.MenuItemRepository;
import org.database.backend.repositories.RestoranRepository;
import org.database.backend.services.MenuItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImpl implements MenuItemService {
    private final MenuItemRepository menuItemRepository;
    private final RestoranRepository restoranRepository;

    public MenuItemServiceImpl(MenuItemRepository menuItemRepository, RestoranRepository restoranRepository) {
        this.menuItemRepository = menuItemRepository;
        this.restoranRepository = restoranRepository;
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
    public Integer saveMenuItem(MenuItemDto menuItem) throws Exception {
        Restoran restoran = restoranRepository.findById(menuItem.getRestorantId())
                .orElseThrow(() -> new Exception("Restorant not found"));

        MenuItem newMenuItem = new MenuItem();
        newMenuItem.setCena(menuItem.getCena());
        newMenuItem.setIme(menuItem.getIme());
        newMenuItem.setRestoran(restoran);

        menuItemRepository.save(newMenuItem);
        return newMenuItem.getId();
    }

    @Override
    public void editMenuItem(Integer id, MenuItemDto menuItem) throws Exception {
        MenuItem updateMenuItem = findMenuItemById(id).orElseThrow(() -> new Exception("Menu Item not found"));

        Restoran restoran = restoranRepository.findById(menuItem.getRestorantId())
                .orElseThrow(() -> new Exception("Restorant not found"));

        updateMenuItem.setCena(menuItem.getCena());
        updateMenuItem.setIme(menuItem.getIme());
        updateMenuItem.setRestoran(restoran);
        menuItemRepository.save(updateMenuItem);
    }

    @Override
    public void deleteMenuItem(Integer id) {
        menuItemRepository.deleteById(id);
    }
}
