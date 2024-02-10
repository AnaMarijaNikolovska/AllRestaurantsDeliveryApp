package org.database.backend.controllers;

import org.database.backend.models.Restoran;
import org.database.backend.services.RestoranService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/restorants")
@CrossOrigin("http://localhost:3000/")
public class RestorantController {
    private final RestoranService restoranService;

    public RestorantController(RestoranService restoranService) {
        this.restoranService = restoranService;
    }

    @GetMapping
    public List<Restoran> getAll() {
        return restoranService.findAllRestorans();
    }

    @GetMapping("{id}")
    public Optional<Restoran> getById(@PathVariable Integer id) {
        return restoranService.findRestoranById(id);
    }

    @PostMapping
    public Restoran create(@RequestBody Restoran restoran) {
        return restoranService.saveRestoran(restoran);
    }
}
