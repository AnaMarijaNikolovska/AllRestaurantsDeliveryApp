package org.database.backend.controllers;

import org.database.backend.models.Naracka;
import org.database.backend.models.dto.CreateNarackaDto;
import org.database.backend.services.NarackaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final NarackaService narackaService;

    public OrderController(NarackaService narackaService) {
        this.narackaService = narackaService;
    }

    @GetMapping
    public List<Naracka> getAll(@RequestParam(value = "status", required= false) String status) {
        return narackaService.findAllNaracki();
    }

    @GetMapping("{id}")
    public Naracka getById(@PathVariable Integer id) throws Exception {
        return narackaService.findNarackaById(id);
    }

    @PostMapping
    public Integer create(@RequestBody CreateNarackaDto createNarackaDto) throws Exception {
        return narackaService.saveNaracka(createNarackaDto);
    }

    @PostMapping("{id}")
    public void update(@PathVariable Integer id, @RequestBody CreateNarackaDto createNarackaDto) throws Exception {
        narackaService.editNaracka(id, createNarackaDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) throws Exception {
        narackaService.deleteNaracka(id);
    }
}
