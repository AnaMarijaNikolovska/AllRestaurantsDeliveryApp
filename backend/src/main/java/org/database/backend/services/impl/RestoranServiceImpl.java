package org.database.backend.services.impl;

import org.database.backend.models.Manager;
import org.database.backend.models.Restoran;
import org.database.backend.models.dto.RestorantDto;
import org.database.backend.repositories.ManagerRepository;
import org.database.backend.repositories.RestoranRepository;
import org.database.backend.services.RestoranService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestoranServiceImpl implements RestoranService {
    private final RestoranRepository restoranRepository;
    private final ManagerRepository managerRepository;

    public RestoranServiceImpl(RestoranRepository restoranRepository, ManagerRepository managerRepository) {
        this.restoranRepository = restoranRepository;
        this.managerRepository = managerRepository;
    }

    @Override
    public List<Restoran> findAllRestorans() {
        return restoranRepository.findAll();
    }

    @Override
    public Optional<Restoran> findRestoranById(Integer id) {
        return restoranRepository.findById(id);
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
        Restoran updateRestoran = findRestoranById(id)
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
