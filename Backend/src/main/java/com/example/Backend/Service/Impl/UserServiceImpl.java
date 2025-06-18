package com.example.Backend.Service.Impl;

import com.example.Backend.DTO.LoginRequest;
import com.example.Backend.DTO.LoginResponse;
import com.example.Backend.DTO.RegisterRequest;
import com.example.Backend.Entity.User;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Security.JwtUtil;
import com.example.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }


    @Override
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByUserName(request.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUserName());

                return new LoginResponse(token,
                        user.getUserName(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getStatus(),
                        user.getAvatar(),
                        user.getPhone(),
                        user.getUserId());

            }
        }

        throw new RuntimeException("Sai tài khoản hoặc mật khẩu");
    }


    @Override
    public void register(RegisterRequest request) {
        if (userRepository.existsByUserName(request.getUsername())) {
            throw new RuntimeException("Username đã tồn tại");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();
        user.setUserName(request.getUsername());
        user.setFullName(request.getFull_Name());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAvatar("https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238840/huong-dan-chon-mu-bao-hiem-tre-em-dat-chuan-6-730x420_ncgcum.jpg");
        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    public User getUserById(String userName, Long userId) {
        Optional<User> userOptional;

        if (userId != null && userId != 0) {
            userOptional = userRepository.findByUserId(userId);
        } else if (userName != null && !userName.isEmpty()) {
            userOptional = userRepository.findByUserName(userName);
        } else {
            throw new RuntimeException("Thiếu thông tin user id hoặc user name");
        }

        return userOptional.orElseThrow(() -> new RuntimeException("User không tồn tại"));
    }


}
