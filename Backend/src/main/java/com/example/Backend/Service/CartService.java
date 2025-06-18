package com.example.Backend.Service;

import com.example.Backend.Entity.CartItem;

import java.util.List;

public interface CartService {
    List<CartItem> getCartItemsByUserId(Long userId);
    List<CartItem> updateCart(Long userId, Long productId, int increase, int decrease);
}
