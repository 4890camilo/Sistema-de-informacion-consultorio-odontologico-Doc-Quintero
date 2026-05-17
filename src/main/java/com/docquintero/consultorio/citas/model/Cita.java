package com.docquintero.consultorio.citas.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import java.util.List;

@Document(collection = "citas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cita {

    @Id
    private String id;
    private String pacienteId;
    private String odontologoId;
    private LocalDateTime fechaHora;
    private Integer duracionMinutos; // Duración total
    private Integer duracionBloque; // 15, 30, 45, 60
    private TipoCita tipo;
    private EstadoCita estado;
    private String notas;
    private String comentarioInterno;
    private boolean notificarPaciente;
    
    private List<EstadoHistorial> historialEstados;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EstadoHistorial {
        private EstadoCita estado;
        private String usuarioId;
        private LocalDateTime fechaHora;
    }
}
