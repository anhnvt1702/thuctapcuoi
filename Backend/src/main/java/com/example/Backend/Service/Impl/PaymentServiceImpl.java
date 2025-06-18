package com.example.Backend.Service.Impl;

import com.example.Backend.Entity.Payment;
import com.example.Backend.Repository.PaymentRepository;
import com.example.Backend.Service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Optional<Payment> findById(Integer id) {
        return paymentRepository.findById(id);
    }

    @Override
    public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public void deleteById(Integer id) {
        paymentRepository.deleteById(id);
    }
}