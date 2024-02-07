package org.database.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Restoran")
public class Restoran {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "ime", nullable = false)
    private String ime;

    @Column(name = "lokacija", nullable = false)
    private String lokacija;

    @Column(name = "rabotno_vreme", nullable = false)
    private String rabotnoVreme;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;
}
