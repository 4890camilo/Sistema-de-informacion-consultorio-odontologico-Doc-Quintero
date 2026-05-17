package com.docquintero.consultorio.documentos.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "documentos_clinicos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentoClinico {
    @Id
    private String id;
    private String pacienteId;
    private String profesionalId;
    private String tipo; // RECETA, CONSENTIMIENTO, PRESUPUESTO
    private String titulo;
    private String contenidoHtml;
    private String estado; // ACTIVO, ARCHIVADO, ANULADO
    private LocalDateTime createdAt;
}
