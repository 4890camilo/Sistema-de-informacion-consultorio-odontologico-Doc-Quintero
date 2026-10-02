package com.docquintero.consultorio.auth.dto;

import com.docquintero.consultorio.auth.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponse {
    private String id;
    private String email;
    private String nombre;
    private Set<Rol> roles;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
