package org.database.backend.services;

import org.database.backend.models.Naplata;
import org.database.backend.models.dto.NaplataDto;

import java.util.List;

public interface NaplataService {
    List<Naplata> findAllNaplati();

    List<Naplata> findAllNaplatiByCustomerId(Integer id);

    Naplata findNaplataById(Integer id) throws Exception;

    Integer saveNaplata(NaplataDto naplata) throws Exception;

    void editNaplata(Integer id, NaplataDto naplata) throws Exception;

    void deleteNaplata(Integer id);
}
