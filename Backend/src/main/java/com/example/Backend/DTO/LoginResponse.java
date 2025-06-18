package com.example.Backend.DTO;


public class LoginResponse {
    private String token;
    private String user_Name;
    private String full_Name;
    private String email;
    private String status_Text;
    private String avatar;
    private String phone;
    private Long userId;


    public LoginResponse(String token, String user_Name, String full_Name, String email, String status_Text, String avatar, String phone, Long userId ) {
        this.token = token;
        this.user_Name = user_Name;
        this.full_Name = full_Name;
        this.email = email;
        this.status_Text = status_Text;
        this.avatar = avatar;
        this.phone = phone;
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getStatus_Text() {
        return status_Text;
    }

    public void setStatus_Text(String status_Text) {
        this.status_Text = status_Text;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFull_Name() {
        return full_Name;
    }

    public void setFull_Name(String full_Name) {
        this.full_Name = full_Name;
    }

    public String getUser_Name() {
        return user_Name;
    }

    public void setUser_Name(String user_Name) {
        this.user_Name = user_Name;
    }
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}

