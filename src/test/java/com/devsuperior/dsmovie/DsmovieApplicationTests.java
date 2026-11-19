package com.devsuperior.dsmovie;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.devsuperior.dsmovie.entities.User;
import com.devsuperior.dsmovie.repositories.UserRepository;

@SpringBootTest
@ActiveProfiles("test")
class DsmovieApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Test
	void contextLoads() {
	}

	@Test
	void shouldLoadUserAndAdminRoles() {
		User maria = userRepository.findByEmail("maria@gmail.com");
		User joao = userRepository.findByEmail("joao@gmail.com");

		assertThat(maria.getRoles())
			.extracting(role -> role.getAuthority())
			.containsExactlyInAnyOrder("ROLE_USER", "ROLE_ADMIN");
		assertThat(joao.getRoles())
			.extracting(role -> role.getAuthority())
			.containsExactly("ROLE_USER");
	}

}
