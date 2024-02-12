package org.database.backend.controllers;

import org.database.backend.models.Naplata;
import org.database.backend.models.dto.NaplataDto;
import org.database.backend.services.NaplataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final NaplataService naplataService;

    public PaymentController(NaplataService naplataService) {
        this.naplataService = naplataService;
    }

    @GetMapping
    public List<Naplata> getAll(@RequestParam(value = "status", required = false) String status) {
        return naplataService.findAllNaplati();
    }

    @GetMapping("{id}")
    public Naplata getById(@PathVariable Integer id) throws Exception {
        return naplataService.findNaplataById(id);
    }

    @GetMapping("customer/{id}")
    public List<Naplata> getByCustomerId(@PathVariable Integer id) throws Exception {
        return naplataService.findAllNaplatiByCustomerId(id);
    }

    @PostMapping
    public Integer create(@RequestBody NaplataDto naplataDto) throws Exception {
        return naplataService.saveNaplata(naplataDto);
    }

    @PostMapping("{id}")
    public void update(@PathVariable Integer id, @RequestBody NaplataDto naplataDto) throws Exception {
        naplataService.editNaplata(id, naplataDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        naplataService.deleteNaplata(id);
    }
}
