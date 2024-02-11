package org.database.backend.services.impl;

import org.database.backend.models.Vozac;
import org.database.backend.models.Vozilo;
import org.database.backend.models.dto.VoziloDto;
import org.database.backend.repositories.VozacRepository;
import org.database.backend.repositories.VoziloRepository;
import org.database.backend.services.VoziloService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoziloServiceImpl implements VoziloService {
    private final VoziloRepository voziloRepository;
    private final VozacRepository vozacRepository;

    public VoziloServiceImpl(VoziloRepository voziloRepository, VozacRepository vozacRepository) {
        this.voziloRepository = voziloRepository;
        this.vozacRepository = vozacRepository;
    }

    @Override
    public List<Vozilo> findAllVozila() {
        return voziloRepository.findAll();
    }

    @Override
    public Vozilo findVoziloById(Integer id) throws Exception {
        return voziloRepository.findById(id)
                .orElseThrow(() -> new Exception("Vehicle is not found"));
    }

    @Override
    public Integer saveVozilo(VoziloDto vozilo) throws Exception {
        Vozilo newVozilo = new Vozilo();
        Vozac vozac = vozacRepository.findById(vozilo.getVozacId())
                .orElseThrow(() -> new Exception("Driver not found"));

        newVozilo.setRegistracija(vozilo.getRegistracija());
        newVozilo.setTip(vozilo.getTip());
        newVozilo.setVozac(vozac);
        voziloRepository.save(newVozilo);

        return newVozilo.getId();
    }

    @Override
    public void editVozilo(Integer id, VoziloDto vozilo) throws Exception {
        Vozilo updateVozilo = findVoziloById(id);

        updateVozilo.setRegistracija(vozilo.getRegistracija());
        updateVozilo.setTip(vozilo.getTip());

        voziloRepository.save(updateVozilo);
    }

    @Override
    public void deleteVozilo(Integer id) {
        voziloRepository.deleteById(id);
    }
}
