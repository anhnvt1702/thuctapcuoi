package com.example.Backend.Repository;

import com.example.Backend.Entity.OrderTracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderTrackingRepository extends JpaRepository<OrderTracking, Long> {}
