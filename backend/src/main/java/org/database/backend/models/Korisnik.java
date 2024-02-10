package org.database.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.database.backend.models.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Korisnik")
public class Korisnik implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "korisnik_id")
    Integer id;
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "pword", nullable = false)
    private String password;

    @Transient
    @JsonIgnore
    boolean isAccountNonExpired = true;

    @Transient
    @JsonIgnore
    boolean isAccountNonLocked = true;

    @Transient
    @JsonIgnore
    boolean isCredentialsNonExpired = true;

    @Transient
    @JsonIgnore
    boolean isEnabled = true;

    @Transient
    @Enumerated(EnumType.STRING)
    Role role;

    public Korisnik(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public Korisnik(String email, String username, String password, Role role) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
