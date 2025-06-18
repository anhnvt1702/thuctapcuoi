package com.example.Backend.Service;

import com.example.Backend.Entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> findAll();
    Optional<Category> findById(Integer id);
    Category save(Category category);
    void deleteById(Integer id);
    List<Category> getAllCategories();
}
