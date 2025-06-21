// com.example.Backend.Controller.AdminController.java
package com.example.Backend.Controller;

import com.example.Backend.DTO.StatsResponse;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Repository.OrderRepository;
import com.example.Backend.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/stats")
    public StatsResponse getStats() {
        long userCount = userRepository.count();
        long orderCount = orderRepository.count();
        long productCount = productRepository.count();

        return new StatsResponse(userCount, orderCount, productCount);
    }
}
