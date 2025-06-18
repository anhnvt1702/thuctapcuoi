package com.example.Backend.Utils;

import com.example.Backend.DTO.OrderDTO;
import com.example.Backend.DTO.OrderDetailDTO;
import com.example.Backend.Entity.Order;
import com.example.Backend.Entity.OrderDetail;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        OrderDTO dto = new OrderDTO();

        dto.setCustomerId(order.getCustomerId());
        dto.setCustomerName(order.getCustomerName());
        dto.setAddress(order.getAddress());
        dto.setCity(order.getCity());
        dto.setDistrict(order.getDistrict());
        dto.setProvince(order.getProvince());
        dto.setPhone(order.getPhone());
        dto.setSettleType(order.getSettleType());
        dto.setTrackId(order.getTrackId());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setTotalOrderValue(order.getTotalOrderValue());
        dto.setOrderDate(order.getOrderDate());

        if (order.getOrderDetails() != null) {
            List<OrderDetailDTO> detailDTOs = order.getOrderDetails().stream().map(OrderMapper::toDetailDTO).collect(Collectors.toList());
            dto.setOrderDetails(detailDTOs);
        }

        return dto;
    }

    private static OrderDetailDTO toDetailDTO(OrderDetail detail) {
        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setProductId(detail.getProductId());
        dto.setQuantity(detail.getQuantity());
        dto.setPrice(detail.getPrice());
        dto.setProductName(detail.getProductName());
        dto.setImg1path(detail.getImg1path());
        return dto;
    }
}

