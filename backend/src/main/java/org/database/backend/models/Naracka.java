package org.database.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.database.backend.models.enums.OrderStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    private LocalDateTime datum;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @ManyToOne
    @JoinColumn(name = "potrosuvac_id")
    private Potrosuvac potrosuvac;

    @ManyToOne
    @JoinColumn(name = "vozac_id")
    private Vozac vozac;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Administrator administrator;

    @OneToMany(mappedBy = "naracka")
    private List<NarackaMenuItem> narackaMenuItems = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Naracka naracka)) return false;
        return Objects.equals(id, naracka.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
