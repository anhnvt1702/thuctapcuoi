package com.example.Backend.Controller;

import com.example.Backend.Entity.Payment;
import com.example.Backend.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPaymentsByUser(@PathVariable Integer userId) {
        List<Payment> payments = paymentRepository.findByUserId(userId);
        return ResponseEntity.ok(payments);
    }
}
