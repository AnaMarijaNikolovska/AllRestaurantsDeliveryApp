package org.database.backend.controllers;

import org.database.backend.models.dto.UserDto;
import org.database.backend.models.dto.UserLoginDto;
import org.database.backend.services.KorisnikService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/users")
public class UserController {
    private final KorisnikService userService;

    public UserController(KorisnikService userService) {
        this.userService = userService;
    }

    @PostMapping
    public Integer registerUser(@RequestBody UserDto userDto) {
        return userService.save(userDto);
    }

    @PostMapping("login")
    public UserDetails loginUser(@RequestBody UserLoginDto userLoginDto) throws Exception {
        return userService.loginUser(userLoginDto);
    }
}
