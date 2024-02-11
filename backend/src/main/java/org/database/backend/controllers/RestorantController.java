package org.database.backend.controllers;

import org.database.backend.models.Restoran;
import org.database.backend.models.dto.RestorantDto;
import org.database.backend.models.responses.RestorantResponse;
import org.database.backend.repositories.RestoranRepository;
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
    public RestorantResponse getById(@PathVariable Integer id) throws Exception {
        return restoranService.findRestoranById(id);
    }

    @PostMapping
    public Integer create(@RequestBody RestorantDto restoran) throws Exception {
        return restoranService.saveRestoran(restoran);
    }

    @PostMapping("{id}")
    public void update(@PathVariable Integer id, @RequestBody RestorantDto restoran) throws Exception {
        restoranService.editRestoran(id, restoran);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) throws Exception {
        restoranService.deleteRestoran(id);
    }
}
