package com.docquintero.consultorio.historiaclinica.dto;

import java.time.LocalDateTime;

import com.docquintero.consultorio.historiaclinica.model.Anamnesis;

public record HistoriaClinicaResponse(
    String id,
    String pacienteId,
    Anamnesis anamnesis,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
