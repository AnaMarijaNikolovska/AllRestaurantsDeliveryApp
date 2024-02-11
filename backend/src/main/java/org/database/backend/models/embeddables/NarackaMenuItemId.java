package org.database.backend.models.embeddables;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NarackaMenuItemId implements Serializable {
    @Column(name = "naracka_id")
    private Integer narackaId;

    @Column(name = "menu_item_id")
    private Integer menuItemId;
}
