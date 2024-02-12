package org.database.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.database.backend.models.enums.PaymentType;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Naplata")
public class Naplata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "Iznos", nullable = false)
    private int iznos;

    @Column(name = "nacin_na_plakjane")
    @Enumerated(EnumType.STRING)
    private PaymentType nacinNaPlakjane;

    @ManyToOne
    @JoinColumn(name = "potrosuvac_id")
    private Potrosuvac potrosuvac;

    @OneToOne
    @JoinColumn(name = "naracka_id ")
    private Naracka naracka;
}
