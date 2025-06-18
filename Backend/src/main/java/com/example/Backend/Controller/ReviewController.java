package com.example.Backend.Controller;

import com.example.Backend.Entity.Review;
import com.example.Backend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/get-by-product-id")
    public ResponseEntity<?> getReviewsByProductId(@RequestParam("p_product_id") Long productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }
    @PostMapping("/create")
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        try {
            Review savedReview = reviewService.addReview(review);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
