package com.example.Backend.Service.Impl;

import com.example.Backend.Entity.CartItem;
import com.example.Backend.Repository.CartRepository;
import com.example.Backend.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<CartItem> getCartItemsByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public List<CartItem> updateCart(Long userId, Long productId, int increase, int decrease) {
        Optional<CartItem> optionalCartItem = cartRepository.findByUserIdAndProductId(userId, productId);
        CartItem cartItem;

        if (optionalCartItem.isPresent()) {
            cartItem = optionalCartItem.get();
            int newQuantity = cartItem.getQuantity() + increase - decrease;
            if (newQuantity <= 0) {
                cartRepository.delete(cartItem);
            } else {
                cartItem.setQuantity(newQuantity);
                cartRepository.save(cartItem);
            }
        } else {
            if (increase <= 0) {
                throw new RuntimeException("Không thể thêm sản phẩm có số lượng <= 0");
            }
            cartItem = new CartItem();
            cartItem.setUserId(userId);
            cartItem.setProductId(productId);
            cartItem.setQuantity(increase);
            cartRepository.save(cartItem);
        }

        return cartRepository.findByUserId(userId);
    }
}
