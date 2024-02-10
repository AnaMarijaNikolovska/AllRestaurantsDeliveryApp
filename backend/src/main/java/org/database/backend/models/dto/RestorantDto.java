package org.database.backend.models.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class RestorantDto {

    @NonNull
    private String ime;

    @NonNull
    private String lokacija;

    @NonNull
    private String rabotnoVreme;

    private Integer ManagerId;
}
