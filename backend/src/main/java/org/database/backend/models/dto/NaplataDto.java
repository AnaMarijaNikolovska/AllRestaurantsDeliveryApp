package org.database.backend.models.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class NaplataDto {

    @NonNull
    private int totalPrice;

    @NonNull
    private String paymentType;

    @NonNull
    private Integer potrosuvacId;

    @NonNull
    private Integer narackaId;

    String token;
}
