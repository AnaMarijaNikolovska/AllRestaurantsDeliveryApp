package org.database.backend.services;

import org.database.backend.models.Restoran;
import org.database.backend.models.dto.RestorantDto;

import java.util.List;
import java.util.Optional;

public interface RestoranService {
    List<Restoran> findAllRestorans();
    Optional<Restoran> findRestoranById(Integer id);
    Integer saveRestoran(RestorantDto restoran) throws Exception;
    void editRestoran(Integer id, RestorantDto restoran) throws Exception;
    void deleteRestoran(Integer id);
}
