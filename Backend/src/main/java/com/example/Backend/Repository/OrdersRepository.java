package com.example.Backend.Repository;

import com.example.Backend.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    Optional<Orders> findByTrackId(String trackId);
    List<Orders> findByCustomerId(Long customerId);
}