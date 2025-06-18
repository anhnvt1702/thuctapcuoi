package com.example.Backend.Repository;

import com.example.Backend.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByUserId(Integer userId);
}

