package com.example.Backend.Service.Impl;

import com.example.Backend.DTO.OrderDTO;
import com.example.Backend.Entity.Order;
import com.example.Backend.Entity.OrderDetail;
import com.example.Backend.Entity.Product;
import com.example.Backend.Repository.OrderRepository;
import com.example.Backend.Repository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;

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
            // Lấy sản phẩm từ DB
            Product product = productRepository.findByProductId(detailDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + detailDTO.getProductId()));

            // Trừ số lượng
            int newQuantity = product.getStockQuantity() - detailDTO.getQuantity();
            if (newQuantity < 0) {
                throw new RuntimeException("Not enough stock for product ID: " + detailDTO.getProductId());
            }
            product.setStockQuantity(newQuantity);
            productRepository.save(product); // Cập nhật lại vào DB

            // Tạo OrderDetail
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

    @Override
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(Long orderId, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setOrderStatus(status);
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Không tìm thấy đơn hàng với ID: " + orderId);
        }
    }
}
