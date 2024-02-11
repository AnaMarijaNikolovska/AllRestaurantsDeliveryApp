package org.database.backend.services;

import org.database.backend.models.Vozilo;
import org.database.backend.models.dto.VoziloDto;

import java.util.List;
import java.util.Optional;

public interface VoziloService {
    List<Vozilo> findAllVozila();

    Vozilo findVoziloById(Integer id) throws Exception;

    Integer saveVozilo(VoziloDto vozilo) throws Exception;

    void editVozilo(Integer id, VoziloDto vozilo) throws Exception;

    void deleteVozilo(Integer id);
}
