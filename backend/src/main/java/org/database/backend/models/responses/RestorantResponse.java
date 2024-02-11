package org.database.backend.models.responses;

import lombok.Data;
import org.database.backend.models.Manager;
import org.database.backend.models.MenuItem;

import java.util.ArrayList;
import java.util.List;

@Data
public class RestorantResponse {
    private Integer id;

    private String ime;

    private String lokacija;

    private String rabotnoVreme;

    private Manager manager;

    private List<MenuItem> menuItems = new ArrayList<>();

    public RestorantResponse(Integer id, String ime, String lokacija, String rabotnoVreme, Manager manager) {
        this.id = id;
        this.ime = ime;
        this.lokacija = lokacija;
        this.rabotnoVreme = rabotnoVreme;
        this.manager = manager;
    }
}
