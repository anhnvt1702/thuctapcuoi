package com.example.Backend.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

// OrderDetail.java
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailId;

    private Long productId;
    private Integer quantity;
    private BigDecimal price;
    private String productName;
    private String img1path;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public Long getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(Long orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getImg1path() {
        return img1path;
    }

    public void setImg1path(String img1path) {
        this.img1path = img1path;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}