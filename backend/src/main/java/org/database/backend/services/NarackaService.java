package org.database.backend.services;

import org.database.backend.models.Naracka;
import org.database.backend.models.Vozac;

import java.util.List;
import java.util.Optional;

public interface NarackaService {
    List<Naracka> findAllNaracki();
    Optional<Naracka> findNarackaById(Integer naracka_id);

//    List<Vozac> findAllNarackiByVozac();
//    List<Vozac> findAllNarackiByRestoran();
//    List<Vozac> findAllNarackiByPotrosuvac();

    Naracka saveNaracka(Naracka naracka);
    Naracka editNaracka(Integer naracka_id,Naracka naracka);
    void deleteNaracka(Integer naracka_id);
}
