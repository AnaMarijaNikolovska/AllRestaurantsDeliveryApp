package org.database.backend.controllers;

import org.database.backend.models.MenuItem;
import org.database.backend.models.dto.MenuItemDto;
import org.database.backend.services.MenuItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/menu-items")
public class MenuItemController {
    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping
    public List<MenuItem> getAll() {
        return menuItemService.findAllMenuItems();
    }

    @GetMapping("{id}")
    public Optional<MenuItem> getById(@PathVariable Integer id) {
        return menuItemService.findMenuItemById(id);
    }

    @PostMapping
    public Integer create(@RequestBody MenuItemDto menuItemDto) throws Exception {
        return menuItemService.saveMenuItem(menuItemDto);
    }

    @PostMapping("{id}")
    public void update(@PathVariable Integer id, @RequestBody MenuItemDto menuItemDto) throws Exception {
        menuItemService.editMenuItem(id, menuItemDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) throws Exception {
        menuItemService.deleteMenuItem(id);
    }
}
