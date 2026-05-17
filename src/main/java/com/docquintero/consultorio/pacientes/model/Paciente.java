package com.docquintero.consultorio.pacientes.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.TypeAlias;

@Document(collection = "patients")
@TypeAlias("com.docquintero.consultorio.model.Patient")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {

    @Id
    private String id;
    
    // Identidad
    private String identificationNumber; // CC, TI, etc.
    private String tipoDocumento; // CC, TI, CE, Pasaporte
    private String firstName;
    private String lastName;
    private String nombreSocial;
    private LocalDate birthDate;
    private String sexo; // Masculino, Femenino, Otro
    private String genero;
    
    // Contacto
    private String email;
    private String phone; // Móvil
    private String telefonoFijo;
    private String address;
    private String ciudad;
    private String departamento;
    
    // Datos Adicionales
    private String bloodType;
    private String allergies;
    private String chronicDiseases;
    private String currentMedications;
    private String insurance; // EPS / Convenio
    private String insuranceNumber;
    private String ocupacion;
    private String empleador;
    private String tipoPaciente; // Particular, Convenio
    private String comoNosConocio;
    private String observaciones;
    
    // Acudiente (para menores o representantes)
    private Acudiente acudiente;

    private boolean active = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Acudiente {
        private String nombre;
        private String identificacion;
        private String parentesco;
        private String telefono;
    }
}
