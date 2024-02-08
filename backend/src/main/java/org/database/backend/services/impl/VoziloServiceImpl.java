package org.database.backend.services.impl;

import org.database.backend.models.Vozilo;
import org.database.backend.repositories.VoziloRepository;
import org.database.backend.services.VoziloService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoziloServiceImpl implements VoziloService {
   private final VoziloRepository voziloRepository;

    public VoziloServiceImpl(VoziloRepository voziloRepository) {
        this.voziloRepository = voziloRepository;
    }

    @Override
    public List<Vozilo> findAllVozila() {
        return voziloRepository.findAll();
    }

    @Override
    public Optional<Vozilo> findVoziloById(Integer id) {
        return voziloRepository.findById(id);
    }

    @Override
    public Vozilo saveVozilo(Vozilo vozilo) {
        Vozilo newVozilo = new Vozilo();
        newVozilo.setBr_telefon(vozilo.getBr_telefon());
        newVozilo.setTip(vozilo.getTip());
        return voziloRepository.save(newVozilo);
    }

    @Override
    public Vozilo editVozilo(Integer id, Vozilo vozilo) {
        Optional<Vozilo> vozilo1 = findVoziloById(id);
        if (vozilo1.isPresent()){
            Vozilo updateVozilo = vozilo1.get();
            updateVozilo.setBr_telefon(vozilo.getBr_telefon());
            updateVozilo.setTip(vozilo.getTip());
            return voziloRepository.save(updateVozilo);
        }
        return null;
    }

    @Override
    public void deleteVozilo(Integer id) {
        voziloRepository.deleteById(id);
    }
}
