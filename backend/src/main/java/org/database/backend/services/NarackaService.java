package org.database.backend.services;

import org.database.backend.models.Naracka;
import org.database.backend.models.dto.CreateNarackaDto;
import org.database.backend.models.dto.NarackaAdminDto;
import org.database.backend.models.dto.NarackaVozacDto;
import org.database.backend.models.enums.OrderStatus;

import java.util.List;

public interface NarackaService {
    List<Naracka> findAllNaracki();

    List<Naracka> findAllByStatus(OrderStatus orderStatus);

    Naracka findNarackaById(Integer id) throws Exception;

    List<Naracka> findAllNarackiByVozac(Integer id);
    List<Naracka> findAllNarackiByPotrosuvac(Integer id);

    Integer saveNaracka(CreateNarackaDto naracka) throws Exception;

    void editNaracka(Integer id, CreateNarackaDto naracka) throws Exception;

    void changeOrderStatus(Integer id, OrderStatus orderStatus) throws Exception;

    void deleteNaracka(Integer naracka_id);

    void assignOrderAdmin(Integer id, NarackaAdminDto orderAdmin) throws Exception;

    void assignOrderDriver(Integer id, NarackaVozacDto orderAdmin) throws Exception;


}
