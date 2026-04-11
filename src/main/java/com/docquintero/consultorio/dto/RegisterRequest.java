package com.docquintero.consultorio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Email es obligatorio")
    @Email(message = "Email debe ser válido")
    private String email;

    @NotBlank(message = "Contraseña es obligatoria")
    private String password;

    @NotEmpty(message = "Roles son obligatorios")
    private Set<String> roles;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Set<String> getRoles() {
        return roles;
    }
}