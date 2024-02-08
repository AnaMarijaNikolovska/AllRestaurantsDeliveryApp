package org.database.backend.services.impl;

import org.database.backend.models.Naplata;
import org.database.backend.repositories.NaplataRepository;
import org.database.backend.services.NaplataService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NaplataServiceImpl implements NaplataService {
    private final NaplataRepository naplataRepository;

    public NaplataServiceImpl(NaplataRepository naplataRepository) {
        this.naplataRepository = naplataRepository;
    }

    @Override
    public List<Naplata> findAllNaplati() {
        return naplataRepository.findAll();
    }

    @Override
    public Optional<Naplata> findNaplataById(Integer id) {
        return naplataRepository.findById(id);
    }

    @Override
    public Naplata saveNaplata(Naplata naplata) {
        Naplata newNaplata = new Naplata();
        newNaplata.setIznos(naplata.getIznos());
        newNaplata.setPotrosuvac(naplata.getPotrosuvac());
        newNaplata.setNacinNaPlakjane(naplata.getNacinNaPlakjane());
        return naplataRepository.save(newNaplata);
    }

    @Override
    public Naplata editNaplata(Integer id, Naplata naplata) {
        Optional<Naplata> naplata1 = findNaplataById(id);
        if (naplata1.isPresent()) {
            Naplata updateNaplata = naplata1.get();
            updateNaplata.setIznos(naplata.getIznos());
            updateNaplata.setPotrosuvac(naplata.getPotrosuvac());
            updateNaplata.setNacinNaPlakjane(naplata.getNacinNaPlakjane());
            return naplataRepository.save(updateNaplata);
        }
        return null;
    }

    @Override
    public void deleteNaplata(Integer id) {
        naplataRepository.deleteById(id);
    }
}
