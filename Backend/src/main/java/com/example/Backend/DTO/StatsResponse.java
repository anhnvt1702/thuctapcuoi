// com.example.Backend.DTO.StatsResponse.java
package com.example.Backend.DTO;

public class StatsResponse {
    private long userCount;
    private long orderCount;
    private long productCount;

    public StatsResponse(long userCount, long orderCount, long productCount) {
        this.userCount = userCount;
        this.orderCount = orderCount;
        this.productCount = productCount;
    }

    public long getUserCount() {
        return userCount;
    }

    public long getOrderCount() {
        return orderCount;
    }

    public long getProductCount() {
        return productCount;
    }
}
