package com.dsmovie.application.port.out;

import com.dsmovie.domain.model.User;

public interface AuthenticationTokenPort {
    String generateToken(User user);
}

