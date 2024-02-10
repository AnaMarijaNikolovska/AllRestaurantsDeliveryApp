package org.database.backend.controllers;

import org.database.backend.models.CustomUserDetails;
import org.database.backend.models.Korisnik;
import org.database.backend.models.dto.UserDto;
import org.database.backend.models.dto.UserLoginDto;
import org.database.backend.services.KorisnikService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/users")
//@CrossOrigin("http://localhost:3000/")
public class UserController {
    private final KorisnikService userService;

    public UserController(KorisnikService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<Korisnik> getAll() {
        return userService.findAll();
    }

    @GetMapping("{id}")
    public Optional<CustomUserDetails> getById(@PathVariable Integer id) {
        return userService.findById(id);
    }

    @PostMapping
    public Integer registerUser(@RequestBody UserDto userDto) {
        return userService.save(userDto);
    }

    @PostMapping("login")
    public CustomUserDetails loginUser(@RequestBody UserLoginDto userLoginDto) throws Exception {
        return userService.loginUser(userLoginDto);
    }
}
