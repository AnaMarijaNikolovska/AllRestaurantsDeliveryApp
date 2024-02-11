package org.database.backend.services;

import org.database.backend.models.Vozilo;
import org.database.backend.models.dto.VoziloDto;

import java.util.List;
import java.util.Optional;

public interface VoziloService {
    List<Vozilo> findAllVozila();
    Optional<Vozilo> findVoziloById(Integer id);
    Integer saveVozilo(VoziloDto vozilo);
    void editVozilo(Integer id, VoziloDto vozilo) throws Exception;
    void deleteVozilo(Integer id);
}
