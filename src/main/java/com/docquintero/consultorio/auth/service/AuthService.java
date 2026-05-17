package com.docquintero.consultorio.auth.service;

import com.docquintero.consultorio.auth.dto.LoginRequest;
import com.docquintero.consultorio.auth.dto.LoginResponse;
import com.docquintero.consultorio.auth.dto.RegisterRequest;
import com.docquintero.consultorio.auth.model.Usuario;
import com.docquintero.consultorio.auth.repo.UsuarioRepository;
import com.docquintero.consultorio.security.JwtUtils;
import com.docquintero.consultorio.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities().stream()
                .map(item -> item.getAuthority().replace("ROLE_", ""))
                .collect(Collectors.toList());

        Usuario usuario = usuarioRepository.findByEmail(userPrincipal.getEmail()).orElseThrow();

        return new LoginResponse(
                jwt,
                "Bearer",
                userPrincipal.getEmail(),
                "Login exitoso",
                roles,
                userPrincipal.getId(),
                usuario.getNombre());
    }

    public Usuario registerUser(RegisterRequest registerRequest) {
        if (usuarioRepository.existsByEmail(registerRequest.email())) {
            throw new RuntimeException("Error: Email ya está en uso!");
        }

        Usuario user = Usuario.builder()
                .email(registerRequest.email())
                .password(passwordEncoder.encode(registerRequest.password()))
                .nombre(registerRequest.nombre())
                .roles(registerRequest.roles())
                .active(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return usuarioRepository.save(user);
    }

    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return usuarioRepository.findByEmail(userPrincipal.getEmail()).orElseThrow();
    }
}
