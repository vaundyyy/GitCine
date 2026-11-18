package com.dsmovie.application.port.in;

import com.dsmovie.application.dto.auth.AuthResponse;
import com.dsmovie.application.dto.auth.LoginRequest;
import com.dsmovie.application.dto.auth.RegisterRequest;

public interface AuthUseCase {
    AuthResponse login(LoginRequest request);

    AuthResponse register(RegisterRequest request);
}