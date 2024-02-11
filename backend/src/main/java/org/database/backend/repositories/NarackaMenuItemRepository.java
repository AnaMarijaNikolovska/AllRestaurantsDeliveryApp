package org.database.backend.repositories;

import org.database.backend.models.NarackaMenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface NarackaMenuItemRepository extends JpaRepository<NarackaMenuItem, Integer> {
    @Query("SELECT nm FROM NarackaMenuItem nm WHERE nm.naracka.id = :narackaId AND nm.menuItem.id = :menuItemId")
    Optional<NarackaMenuItem> getNarackaMenuItemByIds(Integer narackaId, Integer menuItemId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM naracka_sodrzi_menu_item WHERE naracka_id = :narackaId AND menu_item_id = :menuItemId", nativeQuery = true)
    void deleteMenuItemFromNaracka(Integer narackaId, Integer menuItemId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO naracka_sodrzi_menu_item (naracka_id, menu_item_id) VALUES (:narackaId, :menuItemId)", nativeQuery = true)
    void addMenuItemToNaracka(Integer narackaId, Integer menuItemId);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM naracka_sodrzi_menu_item nm INNER JOIN naracka n ON n.id = nm.naracka_id WHERE nm.naracka_id = :narackaId AND n.Status = 'PendingUserApproval' ", nativeQuery = true)
    void deleteAllMenuItemsFromNaracka(Integer narackaId);
}
