package org.database.backend.models.dto;

import lombok.Data;
import org.database.backend.models.enums.Role;

@Data
public class UserDto {
    private String email;

    private String username;

    private String password;

    private String phoneNumber;

    private String address;

    Role role;
}
