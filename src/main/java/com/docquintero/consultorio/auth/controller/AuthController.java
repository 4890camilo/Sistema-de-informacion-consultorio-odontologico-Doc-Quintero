package com.docquintero.consultorio.auth.controller;

import com.docquintero.consultorio.auth.dto.LoginRequest;
import com.docquintero.consultorio.auth.dto.LoginResponse;
import com.docquintero.consultorio.auth.dto.RegisterRequest;
import com.docquintero.consultorio.auth.dto.UsuarioResponse;
import com.docquintero.consultorio.auth.model.Usuario;
import com.docquintero.consultorio.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Endpoints para login, registro y gestión de usuarios")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Retorna un JWT si las credenciales son válidas")
    public ResponseEntity<LoginResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar nuevo usuario", description = "Crea un nuevo usuario en el sistema")
    public ResponseEntity<UsuarioResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        Usuario user = authService.registerUser(registerRequest);
        return ResponseEntity.ok(toResponse(user));
    }

    @GetMapping("/me")
    @Operation(summary = "Obtener info del usuario actual", description = "Retorna la información del usuario autenticado")
    public ResponseEntity<UsuarioResponse> getCurrentUser() {
        Usuario user = authService.getCurrentUser();
        return ResponseEntity.ok(toResponse(user));
    }

    private UsuarioResponse toResponse(Usuario u) {
        return UsuarioResponse.builder()
                .id(u.getId())
                .email(u.getEmail())
                .nombre(u.getNombre())
                .roles(u.getRoles())
                .active(u.isActive())
                .createdAt(u.getCreatedAt())
                .updatedAt(u.getUpdatedAt())
                .build();
    }
}
