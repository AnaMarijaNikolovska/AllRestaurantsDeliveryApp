package org.database.backend.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateNarackaDto {
    private Integer potrosuvacId;

    private String status;

    private List<NarackaMenuItemDto> menuItems;
}
