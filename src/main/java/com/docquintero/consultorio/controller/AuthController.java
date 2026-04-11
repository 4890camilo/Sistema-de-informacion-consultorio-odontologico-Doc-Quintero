package com.docquintero.consultorio.controller;

import com.docquintero.consultorio.dto.AuthResponse;
import com.docquintero.consultorio.dto.LoginRequest;
import com.docquintero.consultorio.dto.RegisterRequest;
import com.docquintero.consultorio.model.Role;
import com.docquintero.consultorio.model.User;
import com.docquintero.consultorio.repository.UserRepository;
import com.docquintero.consultorio.security.JwtUtils;
import com.docquintero.consultorio.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "El correo electrónico ya está registrado");
            return ResponseEntity.badRequest().body(error);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        try {
            var roleSet = request.getRoles().stream()
                    .map(role -> Role.valueOf(role.toUpperCase()))
                    .collect(java.util.stream.Collectors.toSet());
            user.setRoles(roleSet);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Rol inválido. Usa ADMINISTRADOR, ODONTOLOGO o AUXILIAR.");
            return ResponseEntity.badRequest().body(error);
        }

        user.setActive(true);

        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Credenciales inválidas");
            return ResponseEntity.badRequest().body(error);
        }

        if (!user.isActive()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Cuenta bloqueada");
            return ResponseEntity.badRequest().body(error);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
            Set<String> roles = userDetails.getAuthorities().stream()
                    .map(authority -> authority.getAuthority().replace("ROLE_", ""))
                    .collect(java.util.stream.Collectors.toSet());

            return ResponseEntity.ok(new AuthResponse(jwt, "Bearer", userDetails.getEmail(), "Login exitoso", roles));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Credenciales inválidas");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Sesión cerrada exitosamente");
        return ResponseEntity.ok(response);
    }
}