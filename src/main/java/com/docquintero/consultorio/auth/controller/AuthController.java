package com.docquintero.consultorio.auth.controller;

import com.docquintero.consultorio.auth.dto.LoginRequest;
import com.docquintero.consultorio.auth.dto.LoginResponse;
import com.docquintero.consultorio.auth.dto.RegisterRequest;
import com.docquintero.consultorio.auth.model.Usuario;
import com.docquintero.consultorio.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Usuario> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.registerUser(registerRequest));
    }

    @GetMapping("/me")
    @Operation(summary = "Obtener info del usuario actual", description = "Retorna la información del usuario autenticado")
    public ResponseEntity<Usuario> getCurrentUser() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }
}
