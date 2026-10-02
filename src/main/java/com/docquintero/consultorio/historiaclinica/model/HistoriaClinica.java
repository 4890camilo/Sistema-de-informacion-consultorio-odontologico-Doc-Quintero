package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "historias_clinicas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoriaClinica {

    @Id
    private String id;
    private String pacienteId;
    
    private Anamnesis anamnesis;
    
    private java.util.List<String> diagnosticosCie10;
    
    // El odontograma y periodontograma se manejan como colecciones separadas 
    // o versiones vinculadas a esta HC por pacienteId.
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
