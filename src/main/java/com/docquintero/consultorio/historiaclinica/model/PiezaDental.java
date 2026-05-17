package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PiezaDental {
    private Integer numeroPieza; // FDI
    private CondicionDental condicion;
    private List<String> superficiesAfectadas; // MESIAL, DISTAL, OCLUSAL, VESTIBULAR, PALATINO, LINGUAL
    private EstadoPieza estado;
    private String notas;
    private boolean anulada;
}
