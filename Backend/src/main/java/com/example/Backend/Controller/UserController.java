package com.example.Backend.Controller;

import com.example.Backend.DTO.LoginRequest;
import com.example.Backend.DTO.LoginResponse;
import com.example.Backend.DTO.RegisterRequest;
import com.example.Backend.Entity.User;
import com.example.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public LoginResponse login(
            @RequestParam("p_user_name") String username,
            @RequestParam("p_password") String password
    ) {
        LoginRequest request = new LoginRequest();
        request.setUsername(username);
        request.setPassword(password);
        return userService.login(request);
    }

    @PostMapping("/signin") // khớp với URL bên frontend
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            userService.register(request);
            return ResponseEntity.ok("Đăng ký thành công");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-by-id")
    public ResponseEntity<?> getUserById(
            @RequestParam(value = "p_user_name", required = false) String userName,
            @RequestParam(value = "p_user_id", required = false) Long userId) {
        try {
            User user = userService.getUserById(userName, userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/admin/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(Map.of("users", users));
    }

    @PutMapping("/admin/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(Map.of("message", "Cập nhật thành công"));
    }


}