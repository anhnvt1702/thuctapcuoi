package com.example.Backend.Service.Impl;

import com.example.Backend.Entity.OrderTracking;
import com.example.Backend.Entity.Orders;
import com.example.Backend.Repository.OrdersRepository;
import com.example.Backend.Service.OrdersService;
import com.example.Backend.Utils.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersServiceImpl implements OrdersService {


    @Autowired
    private OrdersRepository orderRepository;

    public Orders createOrder(Orders order) {
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.DANG_XU_LY);
        order.getOrderDetails().forEach(detail -> detail.setOrders(order));

        OrderTracking firstTracking = new OrderTracking();
        firstTracking.setStepText("Đơn hàng đang chờ xử lý");
        firstTracking.setUpdateStatusDate(LocalDateTime.now());
        firstTracking.setOrders(order);

        order.getOrderTrackings().add(firstTracking);

        return orderRepository.save(order);
    }

    public List<Orders> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Optional<Orders> getOrderByTrackingId(String trackId) {
        return orderRepository.findByTrackId(trackId);
    }

    public Optional<Orders> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
}
