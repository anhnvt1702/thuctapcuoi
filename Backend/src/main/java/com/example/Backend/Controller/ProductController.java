package com.example.Backend.Controller;

import com.example.Backend.Entity.Product;
import com.example.Backend.Repository.ProductRepository;
import com.example.Backend.Service.ProductService;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @GetMapping("/get-by-category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam Long categoryId) {
        List<Product> products = productRepository.findByCategory_CategoryId(categoryId);
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }
    @GetMapping("/get-by-id")
    public ResponseEntity<?> getProductById(@RequestParam("p_product_id") Long productId) {
        try {
            Product product = productService.getProductById(productId);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/storage")
    public List<Product> getAllProductsInStock() {
        return productService.findAll();
    }
}

