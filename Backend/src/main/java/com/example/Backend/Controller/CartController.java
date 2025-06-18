package com.example.Backend.Controller;

import com.example.Backend.Entity.CartItem;
import com.example.Backend.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }

    // POST users/{userId}/cart
    @PostMapping
    public ResponseEntity<List<CartItem>> updateCart(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam(required = false, defaultValue = "0") int increase,
            @RequestParam(required = false, defaultValue = "0") int decrease
    ) {
        List<CartItem> updatedCart = cartService.updateCart(userId, productId, increase, decrease);
        return ResponseEntity.ok(updatedCart);
    }
}
