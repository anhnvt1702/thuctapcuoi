package com.example.Backend.Service;

import com.example.Backend.Entity.Review;
import java.util.List;
import java.util.Optional;

public interface ReviewService {
    List<Review> findAll();
    Optional<Review> findById(Integer id);
    Review save(Review review);
    void deleteById(Integer id);
    List<Review> getReviewsByProductId(Long productId);
    Review addReview(Review review);
}