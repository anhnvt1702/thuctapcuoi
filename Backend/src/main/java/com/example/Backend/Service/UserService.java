package com.example.Backend.Service;

import com.example.Backend.DTO.LoginRequest;
import com.example.Backend.DTO.LoginResponse;
import com.example.Backend.DTO.RegisterRequest;
import com.example.Backend.Entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Integer id);
    User save(User user);
    void deleteById(Integer id);
    LoginResponse login(LoginRequest request);
    void register(RegisterRequest request);
    User getUserById(String userName, Long userId);
}

