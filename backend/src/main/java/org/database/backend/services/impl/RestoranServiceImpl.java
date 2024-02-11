package org.database.backend.services.impl;

import org.database.backend.models.Manager;
import org.database.backend.models.MenuItem;
import org.database.backend.models.Restoran;
import org.database.backend.models.dto.RestorantDto;
import org.database.backend.models.responses.RestorantResponse;
import org.database.backend.repositories.ManagerRepository;
import org.database.backend.repositories.MenuItemRepository;
import org.database.backend.repositories.RestoranRepository;
import org.database.backend.services.RestoranService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestoranServiceImpl implements RestoranService {
    private final RestoranRepository restoranRepository;
    private final MenuItemRepository menuItemRepository;
    private final ManagerRepository managerRepository;

    public RestoranServiceImpl(RestoranRepository restoranRepository, MenuItemRepository menuItemRepository, ManagerRepository managerRepository) {
        this.restoranRepository = restoranRepository;
        this.menuItemRepository = menuItemRepository;
        this.managerRepository = managerRepository;
    }

    @Override
    public List<Restoran> findAllRestorans() {
        return restoranRepository.findAll();
    }

    @Override
    public RestorantResponse findRestoranById(Integer id) throws Exception {

        RestorantResponse restorant = restoranRepository.findRestorantById(id)
                .orElseThrow(() -> new Exception("Restorant not found"));

        List<MenuItem> menuItems = menuItemRepository.findAllByRestoranId(restorant.getId());
        restorant.setMenuItems(menuItems);
        return restorant;
    }

    @Override
    public Integer saveRestoran(RestorantDto restoran) throws Exception {
        Manager manager = managerRepository.findById(restoran.getManagerId())
                .orElseThrow(() -> new Exception("Manager not found."));

        Restoran newRestoran = new Restoran();
        newRestoran.setIme(restoran.getIme());
        newRestoran.setLokacija(restoran.getLokacija());
        newRestoran.setManager(manager);
        newRestoran.setRabotnoVreme(restoran.getRabotnoVreme());

        restoranRepository.save(newRestoran);
        return newRestoran.getId();
    }

    @Override
    public void editRestoran(Integer id, RestorantDto restoran) throws Exception {
        Restoran updateRestoran = restoranRepository.findById(id)
                .orElseThrow(() -> new Exception("Restorant is not found."));

        updateRestoran.setIme(restoran.getIme());
        updateRestoran.setLokacija(restoran.getLokacija());
        updateRestoran.setRabotnoVreme(restoran.getRabotnoVreme());

        restoranRepository.save(updateRestoran);
    }

    @Override
    public void deleteRestoran(Integer id) {
        restoranRepository.deleteById(id);
    }
}
