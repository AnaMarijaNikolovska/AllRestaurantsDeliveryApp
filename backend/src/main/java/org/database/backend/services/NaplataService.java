package org.database.backend.services;

import org.database.backend.models.Naplata;
import org.database.backend.models.Naracka;

import java.util.List;
import java.util.Optional;

public interface NaplataService {
    List<Naplata> findAllNaplati();
    Optional<Naplata> findNaplataById(Integer id);
    Naplata saveNaplata(Naplata naplata);
    Naplata editNaplata(Integer id, Naplata naplata);
    void deleteNaplata(Integer id);
}
