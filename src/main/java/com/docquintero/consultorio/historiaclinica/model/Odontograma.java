package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "odontogramas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Odontograma {

    @Id
    private String id;
    private String historiaClinicaId;
    private Integer version;
    private LocalDateTime fechaRegistro;
    private List<PiezaDental> piezas;
    private String observaciones;
    private String odontologoId;
    private boolean activo = true; // false = anulado
}
