package org.database.backend.services.impl;

import org.database.backend.models.Vozilo;
import org.database.backend.models.dto.VoziloDto;
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
    public Integer saveVozilo(VoziloDto vozilo) {
        Vozilo newVozilo = new Vozilo();
        newVozilo.setRegistracija(vozilo.getRegistracija());
        newVozilo.setTip(vozilo.getTip());
        voziloRepository.save(newVozilo);

        return newVozilo.getId();
    }

    @Override
    public void editVozilo(Integer id, VoziloDto vozilo) throws Exception {
        Vozilo updateVozilo = findVoziloById(id)
                .orElseThrow(() -> new Exception("Vehicle is not found"));

        updateVozilo.setRegistracija(vozilo.getRegistracija());
        updateVozilo.setTip(vozilo.getTip());

        voziloRepository.save(updateVozilo);
    }

    @Override
    public void deleteVozilo(Integer id) {
        voziloRepository.deleteById(id);
    }
}
