package org.database.backend.services;

import org.database.backend.models.Vozilo;

import java.util.List;
import java.util.Optional;

public interface VoziloService {
    List<Vozilo> findAllVozila();
    Optional<Vozilo> findVoziloById(Integer id);
//    Optional<Vozilo> findVoziloByVozac();
    Vozilo saveVozilo(Vozilo vozilo);
    Vozilo editVozilo(Integer id, Vozilo vozilo);
    void deleteVozilo(Integer id);
}
