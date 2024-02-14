package org.database.backend.repositories;

import org.database.backend.models.Naracka;
import org.database.backend.models.NarackaMenuItem;
import org.database.backend.models.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface NarackaRepository extends JpaRepository<Naracka, Integer> {
    List<Naracka> findAllByStatus(OrderStatus status);

    List<Naracka> findAllByStatusInOrderByIdDesc(List<OrderStatus> statuses);

    List<Naracka> findAllByStatusNot(OrderStatus orderStatus);

    List<Naracka> findAllByVozacId(Integer vozacId);

    List<Naracka> findAllByPotrosuvacIdOrderByIdDesc(Integer potrosuvacId);

    @Query("SELECT n " +
            "FROM Naracka n " +
            "INNER JOIN Potrosuvac p ON n.potrosuvac.id = p.id " +
            "WHERE n.status = org.database.backend.models.enums.OrderStatus.PendingUserApproval " +
            "AND p.id = :id  ")
    Optional<Naracka> findActiveNarackaByPotrosuvacId(Integer id);
}
