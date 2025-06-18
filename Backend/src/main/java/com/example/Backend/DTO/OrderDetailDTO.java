package com.example.Backend.DTO;

import java.math.BigDecimal;

public class OrderDetailDTO {
    private Long productId;
    private Integer quantity;
    private BigDecimal price;
    private String productName;
    private String img1path;
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

    public String getImg1path() {
        return img1path;
    }

    public void setImg1path(String img1path) {
        this.img1path = img1path;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
