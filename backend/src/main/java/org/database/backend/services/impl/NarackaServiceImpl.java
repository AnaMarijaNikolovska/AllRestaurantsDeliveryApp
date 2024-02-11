package org.database.backend.services.impl;

import org.database.backend.models.*;
import org.database.backend.models.dto.CreateNarackaDto;
import org.database.backend.models.dto.NarackaMenuItemDto;
import org.database.backend.models.enums.OrderStatus;
import org.database.backend.repositories.*;
import org.database.backend.services.NarackaService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class NarackaServiceImpl implements NarackaService {
    private final NarackaRepository narackaRepository;
    private final AdminRepository adminRepository;
    private final VozacRepository vozacRepository;
    private final PotrosuvacRepository potrosuvacRepository;
    private final MenuItemRepository menuItemRepository;
    private final NarackaMenuItemRepository narackaMenuItemRepository;

    public NarackaServiceImpl(NarackaRepository narackaRepository, AdminRepository adminRepository, VozacRepository vozacRepository, PotrosuvacRepository potrosuvacRepository, MenuItemRepository menuItemRepository, NarackaMenuItemRepository narackaMenuItemRepository) {
        this.narackaRepository = narackaRepository;
        this.adminRepository = adminRepository;
        this.vozacRepository = vozacRepository;
        this.potrosuvacRepository = potrosuvacRepository;
        this.menuItemRepository = menuItemRepository;
        this.narackaMenuItemRepository = narackaMenuItemRepository;
    }

    @Override
    public List<Naracka> findAllNaracki() {
        return narackaRepository.findAll();
    }

    @Override
    public Naracka findNarackaById(Integer naracka_id) throws Exception {
        return narackaRepository.findById(naracka_id).orElseThrow(() -> new Exception("Order is not found."));
    }

    @Override
    public Integer saveNaracka(CreateNarackaDto naracka) throws Exception {

        if ((long) naracka.getMenuItems().size() == 0) {
            return 0;
        }

        List<NarackaMenuItem> narackaMenuItems = new ArrayList<>();
        Naracka newNaracka = new Naracka();
        Potrosuvac potrosuvac = potrosuvacRepository.findById(naracka.getPotrosuvacId())
                .orElseThrow(() -> new Exception("User not found"));

        newNaracka.setStatus(OrderStatus.valueOf(naracka.getStatus()));
        newNaracka.setPotrosuvac(potrosuvac);
        newNaracka.setDatum(LocalDateTime.now());

        List<Integer> menuItemIds = naracka.getMenuItems().stream().map(NarackaMenuItemDto::getMenuItemId).toList();
        List<MenuItem> menuItems = menuItemRepository.findAllByIdIn(menuItemIds);


        for (MenuItem menuItem : menuItems) {
            Integer quantity = naracka.getMenuItems()
                    .stream()
                    .filter(narackaMenuItemDto -> Objects.equals(menuItem.getId(), narackaMenuItemDto.getMenuItemId()))
                    .findAny().map(NarackaMenuItemDto::getQuantity).orElse(0);

            NarackaMenuItem narackaMenuItem = new NarackaMenuItem(newNaracka, menuItem, quantity);
            narackaMenuItems.add(narackaMenuItem);
        }

        narackaRepository.save(newNaracka);
        narackaMenuItemRepository.saveAll(narackaMenuItems);

        return newNaracka.getId();
    }

    @Override
    public void editNaracka(Integer id, CreateNarackaDto naracka) throws Exception {
        Naracka updateNaracka = findNarackaById(id);

//        if (naracka.getAdministratorId() != null) {
//            Administrator admin = adminRepository.findById(naracka.getAdministratorId()).orElseThrow(() -> new Exception("Admin not found"));
//            updateNaracka.setAdministrator(admin);
//        }
//
//        if (naracka.getVozacId() != null) {
//            Vozac vozac = vozacRepository.findById(naracka.getVozacId()).orElseThrow(() -> new Exception("Driver not found"));
//            updateNaracka.setVozac(vozac);
//        }

        Potrosuvac potrosuvac = potrosuvacRepository.findById(naracka.getPotrosuvacId()).orElseThrow(() -> new Exception("User not found"));
        updateNaracka.setPotrosuvac(potrosuvac);

        updateNaracka.setDatum(LocalDateTime.now());
//        updateNaracka.setApproved(naracka.getIsApproved());


        narackaRepository.save(updateNaracka);
    }

    @Override
    public void deleteNaracka(Integer naracka_id) {
        narackaRepository.deleteById(naracka_id);
    }
}
