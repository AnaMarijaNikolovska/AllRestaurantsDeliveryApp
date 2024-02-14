package org.database.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Menu_Item")
public class MenuItem implements Serializable {
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

    @OneToMany(mappedBy = "menuItem", orphanRemoval = true)
    @JsonIgnore
    private List<NarackaMenuItem> narackaMenuItems = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MenuItem menuItem)) return false;
        return Objects.equals(id, menuItem.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
