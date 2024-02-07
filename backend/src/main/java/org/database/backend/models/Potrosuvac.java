package org.database.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Potrosuvac")
public class Potrosuvac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "br_telefon", nullable = false)
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "korisnik_id")
    private Korisnik korisnik;
}
