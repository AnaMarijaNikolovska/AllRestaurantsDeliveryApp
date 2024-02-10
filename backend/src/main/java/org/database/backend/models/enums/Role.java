package org.database.backend.models.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER,
    ADMIN,
    MANAGER,
    DRIVER,
    Unknown;

    @Override
    public String getAuthority() {
        return name();
    }
}