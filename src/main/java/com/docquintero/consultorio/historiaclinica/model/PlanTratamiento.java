package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "planes_tratamiento")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanTratamiento {
    @Id
    private String id;
    private String pacienteId;
    private String profesionalId;
    private String nombre;
    private List<Prestacion> prestaciones;
    
    private Double presupuestoTotal;
    private Double descuento;
    private Double totalFinal;
    
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaCierreEstimado;
    
    private String estado; // Borrador, Aceptado, Finalizado, Cancelado
    private LocalDateTime createdAt;
}
