package com.example.Backend.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_trackings")
public class OrderTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime updateStatusDate;
    private String stepText;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders orders;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public String getStepText() {
        return stepText;
    }

    public void setStepText(String stepText) {
        this.stepText = stepText;
    }

    public LocalDateTime getUpdateStatusDate() {
        return updateStatusDate;
    }

    public void setUpdateStatusDate(LocalDateTime updateStatusDate) {
        this.updateStatusDate = updateStatusDate;
    }
// Getters, setters
}

