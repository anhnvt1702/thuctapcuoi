package com.example.Backend.Controller;

import com.example.Backend.Entity.Orders;
import com.example.Backend.Service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrdersService ordersService;


    @PostMapping
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
        Orders saved = ordersService.createOrder(order);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{customerId}")
    public ResponseEntity<List<Orders>> getOrdersByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(ordersService.getOrdersByCustomerId(customerId));
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<Orders> getOrderByTracking(@PathVariable String trackId) {
        return ordersService.getOrderByTrackingId(trackId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable Long id) {
        return ordersService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

