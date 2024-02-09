package org.database.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MenuItem")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "ime", nullable = false)
    private String ime;

    @Column(name = "cena", nullable = false)
    private int cena;

    @ManyToOne
    @JoinColumn(name = "restoran_id")
    private Restoran restoran;
}
