package com.example.Backend.Service.Impl;

import com.example.Backend.DTO.OrderDTO;
import com.example.Backend.Entity.Order;
import com.example.Backend.Entity.OrderDetail;
import com.example.Backend.Repository.OrderRepository;
import com.example.Backend.Service.OrderService;
import com.example.Backend.Utils.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {


    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(OrderDTO dto) {
        Order order = new Order();
        order.setCustomerId(dto.getCustomerId());
        order.setTotalOrderValue(dto.getTotalOrderValue());
        order.setOrderStatus(dto.getOrderStatus());
        order.setCustomerName(dto.getCustomerName());
        order.setAddress(dto.getAddress());
        order.setCity(dto.getCity());
        order.setDistrict(dto.getDistrict());
        order.setProvince(dto.getProvince());
        order.setSettleType(dto.getSettleType());
        order.setPhone(dto.getPhone());
        order.setTrackId(dto.getTrackId());

        List<OrderDetail> orderDetails = dto.getOrderDetails().stream().map(detailDTO -> {
            OrderDetail detail = new OrderDetail();
            detail.setProductId(detailDTO.getProductId());
            detail.setQuantity(detailDTO.getQuantity());
            detail.setPrice(detailDTO.getPrice());
            detail.setProductName(detailDTO.getProductName());
            detail.setImg1path(detailDTO.getImg1path());
            detail.setOrder(order);
            return detail;
        }).collect(Collectors.toList());

        order.setOrderDetails(orderDetails);
        return orderRepository.save(order);
    }
    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId, String keySearch) {
        List<Order> orders = new ArrayList<>(); // Khởi tạo orders ngay từ đầu

        if (keySearch != null && keySearch.contains("|")) {
            orders = orderRepository.findByCustomerId(userId);
        }

        return orders.stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }
    @Override
    public Optional<Order> getOrderByTrackingId(String trackId) {
        return orderRepository.findByTrackId(trackId);
    }


}
