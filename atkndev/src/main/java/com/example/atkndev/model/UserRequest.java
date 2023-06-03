package com.example.atkndev.model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class UserRequest {

    private Long id;
    private String username;
    private String mail;
    private Role role;
}
