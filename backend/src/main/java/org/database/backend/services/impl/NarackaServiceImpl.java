package org.database.backend.services.impl;

import org.database.backend.models.*;
import org.database.backend.models.dto.CreateNarackaDto;
import org.database.backend.models.dto.NarackaAdminDto;
import org.database.backend.models.dto.NarackaMenuItemDto;
import org.database.backend.models.dto.NarackaVozacDto;
import org.database.backend.models.enums.OrderStatus;
import org.database.backend.repositories.*;
import org.database.backend.services.NarackaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public List<Naracka> findAllByCustomerUserId(Integer id) {
        return null;
    }

    @Override
    public List<Naracka> findAllByStatus(OrderStatus orderStatus) {
        return narackaRepository.findAllByStatus(orderStatus);
    }

    @Override
    public Naracka findNarackaById(Integer naracka_id) throws Exception {
        return narackaRepository.findById(naracka_id).orElseThrow(() -> new Exception("Order is not found."));
    }

    @Override
    public List<Naracka> findAllNarackiByVozac(Integer id) {
        return narackaRepository.findAllByVozacId(id);
    }

    @Override
    public List<Naracka> findAllNarackiByPotrosuvac(Integer id) {
        return narackaRepository.findAllByPotrosuvacId(id);
    }

    @Override
    public Integer saveNaracka(CreateNarackaDto naracka) throws Exception {

        if (naracka.getMenuItems().isEmpty()) {
            return 0;
        }

        Naracka newNaracka = new Naracka();
        Potrosuvac potrosuvac = potrosuvacRepository.findById(naracka.getPotrosuvacId())
                .orElseThrow(() -> new Exception("User not found"));

        newNaracka.setStatus(OrderStatus.valueOf(naracka.getStatus()));
        newNaracka.setPotrosuvac(potrosuvac);
        newNaracka.setDatum(LocalDateTime.now());

        List<NarackaMenuItem> narackaMenuItems = createNarackaMenuItemList(newNaracka, naracka.getMenuItems());

        narackaRepository.save(newNaracka);
        narackaMenuItemRepository.saveAll(narackaMenuItems);

        return newNaracka.getId();
    }

    @Override
    @Transactional
    public void editNaracka(Integer id, CreateNarackaDto naracka) throws Exception {
        Naracka updateNaracka = findNarackaById(id);

        narackaMenuItemRepository.deleteAllByNarackaId(id);

        if (naracka.getMenuItems().isEmpty()) {
            changeOrderStatus(id, OrderStatus.Terminated);

            return;
        }

        List<NarackaMenuItem> narackaMenuItems = createNarackaMenuItemList(updateNaracka, naracka.getMenuItems());
        updateNaracka.setDatum(LocalDateTime.now());
        updateNaracka.setStatus(OrderStatus.valueOf(naracka.getStatus()));

        narackaRepository.save(updateNaracka);
        narackaMenuItemRepository.saveAll(narackaMenuItems);
    }

    @Override
    public void changeOrderStatus(Integer id, OrderStatus orderStatus) throws Exception {
        Naracka naracka = narackaRepository.findById(id)
                .orElseThrow(() -> new Exception("Order not found"));

        naracka.setStatus(orderStatus);
        narackaRepository.save(naracka);
    }

    @Override
    public void deleteNaracka(Integer naracka_id) {
        narackaRepository.deleteById(naracka_id);
    }

    @Override
    public void assignOrderAdmin(Integer id, NarackaAdminDto orderAdmin) throws Exception {
        Naracka order = findNarackaById(id);

        Administrator administrator = adminRepository.findById(orderAdmin.getAdminId())
                .orElseThrow(() -> new Exception("Admin not found"));

        order.setAdministrator(administrator);
        order.setStatus(OrderStatus.valueOf(orderAdmin.getApprovalStatus()));

        narackaRepository.save(order);
    }

    @Override
    public void assignOrderDriver(Integer id, NarackaVozacDto orderDriver) throws Exception {
        Naracka order = findNarackaById(id);

        Vozac vozac = vozacRepository.findById(orderDriver.getVozacId())
                .orElseThrow(() -> new Exception("Admin not found"));

        order.setVozac(vozac);
        order.setStatus(OrderStatus.valueOf(orderDriver.getDeliveryStatus()));

        narackaRepository.save(order);
    }

    private List<NarackaMenuItem> createNarackaMenuItemList(Naracka naracka, List<NarackaMenuItemDto> menuItemsDto) {
        List<NarackaMenuItem> narackaMenuItems = new ArrayList<>();

        List<Integer> menuItemIds = menuItemsDto.stream().map(NarackaMenuItemDto::getMenuItemId).toList();
        List<MenuItem> menuItems = menuItemRepository.findAllByIdIn(menuItemIds);

        for (MenuItem menuItem : menuItems) {
            int quantity = menuItemsDto
                    .stream()
                    .filter(narackaMenuItemDto -> Objects.equals(menuItem.getId(), narackaMenuItemDto.getMenuItemId()))
                    .findAny().map(NarackaMenuItemDto::getQuantity).orElse(0);

            if (quantity < 1) {
                continue;
            }

            NarackaMenuItem narackaMenuItem = new NarackaMenuItem(naracka, menuItem, quantity);
            narackaMenuItems.add(narackaMenuItem);
        }

        return narackaMenuItems;
    }
}
