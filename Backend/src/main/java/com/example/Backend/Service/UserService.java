package com.example.Backend.Service;

import com.example.Backend.DTO.LoginRequest;
import com.example.Backend.DTO.LoginResponse;
import com.example.Backend.DTO.RegisterRequest;
import com.example.Backend.Entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Long id);
    User save(User user);
    void deleteById(Long id);
    LoginResponse login(LoginRequest request);
    void register(RegisterRequest request);
    User getUserById(String userName, Long userId);
    List<User> getAllUsers();
    void updateUser(Long id, User updatedData);
}

