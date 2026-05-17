package com.docquintero.consultorio.auth.dto;

import java.util.List;

public record LoginResponse(
    String token,
    String type,
    String email,
    String message,
    List<String> roles,
    String id,
    String nombre
) {}
