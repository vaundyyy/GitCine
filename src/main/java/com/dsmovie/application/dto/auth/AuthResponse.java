package com.dsmovie.application.dto.auth;

public record AuthResponse(Long id, String name, String email, String token) {
}
