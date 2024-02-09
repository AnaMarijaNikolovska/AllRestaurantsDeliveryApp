package org.database.backend.models.dto;

import lombok.Data;

@Data
public class UserLoginDto {
    private String username;

    private String password;
}
