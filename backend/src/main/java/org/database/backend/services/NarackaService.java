package org.database.backend.services;

import org.database.backend.models.Naracka;
import org.database.backend.models.dto.NarackaDto;
import org.database.backend.models.dto.NarackaAdminDto;
import org.database.backend.models.dto.NarackaVozacDto;
import org.database.backend.models.enums.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface NarackaService {
    List<Naracka> findAllNaracki();

    List<Naracka> findAllByCustomerUserId(Integer id);

    List<Naracka> findAllByStatus(OrderStatus orderStatus);

    List<Naracka> findAllByStatusesIn(List<OrderStatus> orderStatuses);

    Naracka findNarackaById(Integer id) throws Exception;

    Optional<Naracka> findActiveNarackaByPotrosuvacId(Integer id);

    List<Naracka> findAllNarackiByVozac(Integer id);

    List<Naracka> findAllNarackiByPotrosuvac(Integer id);

    Integer saveNaracka(NarackaDto naracka) throws Exception;

    void editNaracka(Integer id, NarackaDto naracka) throws Exception;

    void changeOrderStatus(Integer id, OrderStatus orderStatus) throws Exception;

    void deleteNaracka(Integer naracka_id);

    void assignOrderAdmin(Integer id, NarackaAdminDto orderAdmin) throws Exception;

    void assignOrderDriver(Integer id, NarackaVozacDto orderAdmin) throws Exception;


}
