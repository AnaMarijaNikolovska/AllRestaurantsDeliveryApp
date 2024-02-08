package org.database.backend.services;

import org.database.backend.models.Restoran;

import java.util.List;
import java.util.Optional;

public interface RestoranService {
    List<Restoran> findAllRestorans();
    Optional<Restoran> findRestoranById(Integer id);
    Restoran saveRestoran(Restoran restoran);
    Restoran editRestoran(Integer id, Restoran restoran);
    void deleteRestoran(Integer id);
}
