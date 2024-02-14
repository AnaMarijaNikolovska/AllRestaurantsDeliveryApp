package org.database.backend.controllers;

import org.database.backend.models.Naracka;
import org.database.backend.models.dto.NarackaDto;
import org.database.backend.models.dto.NarackaAdminDto;
import org.database.backend.models.dto.NarackaVozacDto;
import org.database.backend.models.enums.OrderStatus;
import org.database.backend.services.NarackaService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final NarackaService narackaService;

    public OrderController(NarackaService narackaService) {
        this.narackaService = narackaService;
    }

    @GetMapping
    public List<Naracka> getAll(@RequestParam(value = "statuses", required = false) List<String> statuses) {
        if (statuses != null && !statuses.isEmpty()) {
            List<OrderStatus> orderStatuses = new ArrayList<>();

            statuses.forEach(s -> {
                orderStatuses.add(OrderStatus.valueOf(s));
            });
            return narackaService.findAllByStatusesIn(orderStatuses);
        }

        return narackaService.findAllNaracki();
    }

    @GetMapping("customer/{id}")
    public List<Naracka> getAll(@PathVariable Integer id) {
        return narackaService.findAllNarackiByPotrosuvac(id);
    }

    @GetMapping("customer/{id}/active")
    public Optional<Naracka> getActiveOrderByCustomerId(@PathVariable Integer id) {
        return narackaService.findActiveNarackaByPotrosuvacId(id);
    }

    @GetMapping("{id}")
    public Naracka getById(@PathVariable Integer id) throws Exception {
        return narackaService.findNarackaById(id);
    }

    @PostMapping
    public Integer create(@RequestBody NarackaDto narackaDto) throws Exception {
        return narackaService.saveNaracka(narackaDto);
    }

    @PostMapping("{id}")
    public void update(@PathVariable Integer id, @RequestBody NarackaDto narackaDto) throws Exception {
        narackaService.editNaracka(id, narackaDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) throws Exception {
        narackaService.deleteNaracka(id);
    }

    @PostMapping("{id}/status")
    public void changeStatus(@PathVariable Integer id, @RequestBody String orderStatus) throws Exception {
        narackaService.changeOrderStatus(id, OrderStatus.valueOf(orderStatus));
    }

    @PostMapping("{id}/admin")
    public void assignAdmin(@PathVariable Integer id, @RequestBody NarackaAdminDto orderAdmin) throws Exception {
        narackaService.assignOrderAdmin(id, orderAdmin);
    }

    @PostMapping("{id}/driver")
    public void assignDriver(@PathVariable Integer id, @RequestBody NarackaVozacDto orderDriver) throws Exception {
        narackaService.assignOrderDriver(id, orderDriver);
    }
}
