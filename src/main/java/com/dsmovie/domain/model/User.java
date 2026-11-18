package com.dsmovie.domain.model;

import com.dsmovie.domain.exception.DadosInvalidosException;

public class User {

    private Long id;
    private String name;
    private String email;
    private String password;

    public User() {}

    public User(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public void validacaoUser() {
        if (name == null || name.isBlank()) {
            throw new DadosInvalidosException("Name is required");
        }
        if (email == null || email.isBlank() || !email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new DadosInvalidosException("Valid email is required");
        }
        if (password == null || password.isBlank()) {
            throw new DadosInvalidosException("Password is required");
        }
    }
}
