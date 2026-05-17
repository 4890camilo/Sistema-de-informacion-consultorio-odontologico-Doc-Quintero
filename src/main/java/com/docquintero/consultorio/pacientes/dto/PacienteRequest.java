package com.docquintero.consultorio.pacientes.dto;

import com.docquintero.consultorio.pacientes.model.Paciente;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record PacienteRequest(
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
    Paciente.Acudiente acudiente
) {}
