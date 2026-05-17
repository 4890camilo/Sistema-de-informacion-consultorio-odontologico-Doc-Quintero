package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prestacion {
    private String codigo;
    private String nombre;
    private Double valor;
    private String estado; // PENDIENTE, EN_CURSO, REALIZADA, CANCELADA
    private String observaciones;
}
