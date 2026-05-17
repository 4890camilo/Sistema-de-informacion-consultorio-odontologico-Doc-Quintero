package com.docquintero.consultorio.documentos.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "documentos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Documento {

    @Id
    private String id;
    private String pacienteId;
    private String historiaClinicaId;
    private String nombre;
    private TipoDocumento tipo;
    private String url;
    private Long tamanioBytes;
    private String mimeType;
    private LocalDateTime uploadedAt;
}
