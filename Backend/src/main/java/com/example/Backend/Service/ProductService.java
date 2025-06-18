package com.example.Backend.Service;

import com.example.Backend.Entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Optional<Product> findById(Integer id);
    Product save(Product product);
    void deleteById(Integer id);
    Product getProductById(Long productId);
}
