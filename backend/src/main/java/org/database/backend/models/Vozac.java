package org.database.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Vozac")
public class Vozac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vozac_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "korisnik_id")
    private Korisnik korisnik;

    @OneToOne
    @JoinColumn(name = "vozilo_id", nullable = false)
    private Vozilo vozilo;

}
