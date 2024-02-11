package org.database.backend.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.database.backend.models.Korisnik;
import org.database.backend.models.enums.Role;

@EqualsAndHashCode(callSuper = true)
@Data
public class CustomUserDetails extends Korisnik {

    private String address;

    private String phoneNumber;

    private Integer roleId;

    public CustomUserDetails(Integer id, String email, String username, String password, Role role, Integer roleId, String address, String phoneNumber) {
        super(email, username, password, role);
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.id = id;
        this.roleId = roleId;
    }
}
