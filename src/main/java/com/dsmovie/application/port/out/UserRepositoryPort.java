package com.dsmovie.application.port.out;

import com.dsmovie.domain.model.User;
import java.util.Optional;

public interface UserRepositoryPort {
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long userId);

    User save(User user);
}
