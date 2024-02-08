package org.database.backend.services.impl;

import org.database.backend.models.Restoran;
import org.database.backend.repositories.RestoranRepository;
import org.database.backend.services.RestoranService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestoranServiceImpl implements RestoranService {
    private final RestoranRepository restoranRepository;

    public RestoranServiceImpl(RestoranRepository restoranRepository) {
        this.restoranRepository = restoranRepository;
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
    public Restoran saveRestoran(Restoran restoran) {
        Restoran newRestoran = new Restoran();
        newRestoran.setIme(restoran.getIme());
        newRestoran.setLokacija(restoran.getLokacija());
        newRestoran.setManager(restoran.getManager());
        newRestoran.setRabotnoVreme(restoran.getRabotnoVreme());
        return restoranRepository.save(newRestoran);
    }

    @Override
    public Restoran editRestoran(Integer id, Restoran restoran) {
        Optional<Restoran> restoran1 = findRestoranById(id);
        if (restoran1.isPresent()) {
            Restoran updateRestoran = restoran1.get();
            updateRestoran.setIme(restoran.getIme());
            updateRestoran.setLokacija(restoran.getLokacija());
            updateRestoran.setManager(restoran.getManager());
            updateRestoran.setRabotnoVreme(restoran.getRabotnoVreme());
            return restoranRepository.save(updateRestoran);
        }
        return null;
    }

    @Override
    public void deleteRestoran(Integer id) {
        restoranRepository.deleteById(id);
    }
}
