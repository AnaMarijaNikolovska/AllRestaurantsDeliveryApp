package org.database.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Naracka")
public class Naracka {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "Datum")
    private Date datum;

    @ManyToOne
    @JoinColumn(name = "potrosuvac_id")
    private Potrosuvac potrosuvac;

    @ManyToMany
    @JoinColumn(name = "restoran_id")
    private List<Restoran> restoran;

    @ManyToOne
    @JoinColumn(name = "vozac_id")
    private Vozac vozac;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
