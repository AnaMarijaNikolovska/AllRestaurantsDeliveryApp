package org.database.backend.services.impl;

import org.database.backend.models.Naracka;
import org.database.backend.repositories.NarackaRepository;
import org.database.backend.services.NarackaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NarackaServiceImpl implements NarackaService {
    private final NarackaRepository narackaRepository;

    public NarackaServiceImpl(NarackaRepository narackaRepository) {
        this.narackaRepository = narackaRepository;
    }

    @Override
    public List<Naracka> findAllNaracki() {
        return narackaRepository.findAll();
    }

    @Override
    public Optional<Naracka> findNarackaById(Integer naracka_id) {
        return narackaRepository.findById(naracka_id);
    }

    @Override
    public Naracka saveNaracka(Naracka naracka) {
        Naracka newNaracka = new Naracka();
        newNaracka.setDatum(naracka.getDatum());
        newNaracka.setAdmin(naracka.getAdmin());
        newNaracka.setVozac(naracka.getVozac());
        newNaracka.setRestoran(naracka.getRestoran());
        newNaracka.setPotrosuvac(naracka.getPotrosuvac());
        return narackaRepository.save(newNaracka);
    }

    @Override
    public Naracka editNaracka(Integer naracka_id, Naracka naracka) {
        Optional<Naracka> naracka1 = findNarackaById(naracka_id);
        if (naracka1.isPresent()){
            Naracka updateNaracka = naracka1.get();

            updateNaracka.setDatum(naracka.getDatum());
            updateNaracka.setAdmin(naracka.getAdmin());
            updateNaracka.setVozac(naracka.getVozac());
            updateNaracka.setRestoran(naracka.getRestoran());
            updateNaracka.setPotrosuvac(naracka.getPotrosuvac());
            return narackaRepository.save(updateNaracka);
        }
        return null;
    }

    @Override
    public void deleteNaracka(Integer naracka_id) {
        narackaRepository.deleteById(naracka_id);
    }
}
