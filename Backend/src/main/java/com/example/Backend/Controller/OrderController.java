package com.example.Backend.Controller;

import com.example.Backend.DTO.OrderDTO;
import com.example.Backend.Entity.Order;
import com.example.Backend.Service.OrderService;
import com.example.Backend.Utils.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add-not-member")
    public ResponseEntity<?> addOrderNotMember(@RequestBody OrderDTO dto) {
        try {
            Order newOrder = orderService.createOrder(dto);
            return ResponseEntity.ok(Map.of(
                    "success", 1,
                    "trackId", newOrder.getTrackId()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", -1,
                    "message", "Đặt hàng thất bại"
            ));
        }
    }


    @GetMapping("/get-by-user")
    public ResponseEntity<List<OrderDTO>> getOrdersByUser(
            @RequestParam("p_user_id") Long userId,
            @RequestParam(value = "keySearch", required = false) String keySearch) {

        List<OrderDTO> orders = orderService.getOrdersByUserId(userId, keySearch);
        return ResponseEntity.ok(orders);
    }
    @GetMapping("/get-tracking")
    public ResponseEntity<?> getOrderByTrackingId(
            @RequestParam("p_tracking_id") String trackingId) {
        try {
            Optional<Order> orderOpt = orderService.getOrderByTrackingId(trackingId);

            if (orderOpt.isPresent()) {
                OrderDTO dto = OrderMapper.toDTO(orderOpt.get()); // dùng DTO để trả ra
                return ResponseEntity.ok(dto);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "success", -1,
                        "message", "Không tìm thấy đơn hàng"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", -1,
                    "message", "Lỗi hệ thống"
            ));
        }
    }

}

