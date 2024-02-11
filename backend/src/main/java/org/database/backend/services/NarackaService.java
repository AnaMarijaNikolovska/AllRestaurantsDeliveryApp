package org.database.backend.services;

import org.database.backend.models.Naracka;
import org.database.backend.models.dto.CreateNarackaDto;

import java.util.List;

public interface NarackaService {
    List<Naracka> findAllNaracki();

    Naracka findNarackaById(Integer id) throws Exception;

//    List<Vozac> findAllNarackiByVozac();
//    List<Vozac> findAllNarackiByRestoran();
//    List<Vozac> findAllNarackiByPotrosuvac();

    Integer saveNaracka(CreateNarackaDto naracka) throws Exception;

    void editNaracka(Integer id, CreateNarackaDto naracka) throws Exception;

    void deleteNaracka(Integer naracka_id);
}
