package org.database.backend.models.dto;

import lombok.Data;

@Data
public class MenuItemDto {
    private String ime;

    private int cena;

    private Integer restorantId;
}
