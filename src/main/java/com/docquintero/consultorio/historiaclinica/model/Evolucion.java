package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "evoluciones")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Evolucion {
    @Id
    private String id;
    private String pacienteId;
    private String profesionalId;
    private String planTratamientoId;
    
    private String descripcion;
    private String materialesUsados;
    private String observaciones;
    
    private LocalDateTime fecha;
    private String estado; // ACTIVA, ANULADA
    private String motivoAnulacion;
    private LocalDateTime fechaAnulacion;
}
