package com.example.Backend.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Orders order;

    private String method;
    private String status;
    private LocalDateTime paymentDate;
}

