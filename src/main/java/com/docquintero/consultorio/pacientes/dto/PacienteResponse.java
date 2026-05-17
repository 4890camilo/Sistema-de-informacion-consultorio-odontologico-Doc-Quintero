package com.docquintero.consultorio.pacientes.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.docquintero.consultorio.pacientes.model.Paciente;

public record PacienteResponse(
    String id,
    String identificationNumber,
    String tipoDocumento,
    String firstName,
    String lastName,
    String nombreSocial,
    LocalDate birthDate,
    String sexo,
    String genero,
    String email,
    String phone,
    String telefonoFijo,
    String address,
    String ciudad,
    String departamento,
    String bloodType,
    String allergies,
    String chronicDiseases,
    String currentMedications,
    String insurance,
    String insuranceNumber,
    String ocupacion,
    String empleador,
    String tipoPaciente,
    String comoNosConocio,
    String observaciones,
    Paciente.Acudiente acudiente,
    boolean active,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
