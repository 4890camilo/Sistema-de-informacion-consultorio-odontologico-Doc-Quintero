package com.docquintero.consultorio.dto;

import java.util.Set;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String email;
    private String message;
    private Set<String> roles;

    public AuthResponse() {}

    public AuthResponse(String token, String type, String email, String message, Set<String> roles) {
        this.token = token;
        this.type = type;
        this.email = email;
        this.message = message;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public String getType() {
        return type;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public Set<String> getRoles() {
        return roles;
    }
}