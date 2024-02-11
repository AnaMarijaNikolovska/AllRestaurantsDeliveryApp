package org.database.backend.controllers;

import org.database.backend.models.Vozilo;
import org.database.backend.models.dto.VoziloDto;
import org.database.backend.services.VoziloService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private final VoziloService voziloService;

    public VehicleController(VoziloService voziloService) {
        this.voziloService = voziloService;
    }

    @GetMapping
    public List<Vozilo> getAll(@RequestParam(value = "status", required = false) String status) {
        return voziloService.findAllVozila();
    }

    @GetMapping("{id}")
    public Vozilo getById(@PathVariable Integer id) throws Exception {
        return voziloService.findVoziloById(id);
    }

    @PostMapping
    public Integer create(@RequestBody VoziloDto voziloDto) throws Exception {
        return voziloService.saveVozilo(voziloDto);
    }

    @PostMapping("{id}")
    public void update(@PathVariable Integer id, @RequestBody VoziloDto voziloDto) throws Exception {
        voziloService.editVozilo(id, voziloDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        voziloService.deleteVozilo(id);
    }
}
