package com.example.Backend.Repository;

import com.example.Backend.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProduct_ProductId(Long productId);
}
