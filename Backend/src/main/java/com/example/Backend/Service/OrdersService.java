package com.example.Backend.Service;

import com.example.Backend.Entity.Orders;

import java.util.List;
import java.util.Optional;

public interface OrdersService {
    Orders createOrder(Orders order);
    List<Orders> getOrdersByCustomerId(Long customerId);
    Optional<Orders> getOrderByTrackingId(String trackId);
    Optional<Orders> getOrderById(Long id);
}
