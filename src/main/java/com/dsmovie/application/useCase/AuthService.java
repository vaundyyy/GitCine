package com.dsmovie.application.useCase;

import com.dsmovie.application.dto.auth.AuthResponse;
import com.dsmovie.application.dto.auth.LoginRequest;
import com.dsmovie.application.dto.auth.RegisterRequest;
import com.dsmovie.application.port.in.AuthUseCase;
import com.dsmovie.application.port.out.UserRepositoryPort;
import com.dsmovie.application.port.out.AuthenticationTokenPort;
import com.dsmovie.domain.exception.AuthenticationException;
import com.dsmovie.domain.exception.DadosInvalidosException;
import com.dsmovie.domain.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements AuthUseCase {
    private final UserRepositoryPort userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationTokenPort tokenPort;

    public AuthService(UserRepositoryPort userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationTokenPort tokenPort) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenPort = tokenPort;
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new AuthenticationException("Invalid credentials");
        }

        String token = tokenPort.generateToken(user);
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), token);
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.findByEmail(email).isPresent()) {
            throw new DadosInvalidosException("Email is already in use");
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.validacaoUser();

        User saved = userRepository.save(user);
        String token = tokenPort.generateToken(saved);
        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), token);
    }
}