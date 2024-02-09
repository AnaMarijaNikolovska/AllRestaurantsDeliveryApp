package org.database.backend.models.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER,
    ADMIN,
    MANAGER,
    DRIVER;

    @Override
    public String getAuthority() {
        return name();
    }
}