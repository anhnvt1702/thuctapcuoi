package com.example.Backend.Service.Impl;

import com.example.Backend.Entity.Product;
import com.example.Backend.Entity.Review;
import com.example.Backend.Entity.User;
import com.example.Backend.Repository.ProductRepository;
import com.example.Backend.Repository.ReviewRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Optional<Review> findById(Integer id) {
        return reviewRepository.findById(id);
    }

    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void deleteById(Integer id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProduct_ProductId(productId);
    }

    @Override
    public Review addReview(Review review) {
        // Validate product & customer tồn tại
        Long productId = review.getProduct().getProductId();
        Long customerId = review.getCustomer().getUserId();

        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        User customer = userRepository.findByUserId(customerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        review.setProduct(product);
        review.setCustomer(customer);
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }
}
