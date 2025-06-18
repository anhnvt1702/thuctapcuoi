package com.example.Backend.Service;

import com.example.Backend.Entity.Payment;

import java.util.List;
import java.util.Optional;

public interface PaymentService {
    List<Payment> findAll();
    Optional<Payment> findById(Integer id);
    Payment save(Payment payment);
    void deleteById(Integer id);
}

