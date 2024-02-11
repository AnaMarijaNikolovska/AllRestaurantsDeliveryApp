package org.database.backend.services;

import org.database.backend.models.Restoran;
import org.database.backend.models.dto.RestorantDto;
import org.database.backend.models.responses.RestorantResponse;
import org.database.backend.repositories.RestoranRepository;

import java.util.List;
import java.util.Optional;

public interface RestoranService {
    List<Restoran> findAllRestorans();
    RestorantResponse findRestoranById(Integer id) throws Exception;
    Integer saveRestoran(RestorantDto restoran) throws Exception;
    void editRestoran(Integer id, RestorantDto restoran) throws Exception;
    void deleteRestoran(Integer id);
}
