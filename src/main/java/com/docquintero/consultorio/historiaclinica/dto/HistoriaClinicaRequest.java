package com.docquintero.consultorio.historiaclinica.dto;

import jakarta.validation.constraints.NotBlank;

import com.docquintero.consultorio.historiaclinica.model.Anamnesis;

public record HistoriaClinicaRequest(
    String pacienteId,
    Anamnesis anamnesis
) {}
