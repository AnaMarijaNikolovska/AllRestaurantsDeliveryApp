package org.database.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Vozilo")
public class Vozilo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vozilo_id")
    Integer id;

    @Column(name = "tip")
    String tip;

    @Column(name = "br_registracija", nullable = false)
    String registracija;

    @OneToOne
    @JoinColumn(name = "vozac_id", nullable = false)
    @JsonIgnore
    private Vozac vozac;
}
