package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistroPeriodontal {
    private Integer numeroPieza;
    private int[] profundidadSondaje; // 6 puntos: DV, V, MV, DL, L, ML
    private int[] margenGingival;    // 6 puntos
    private int[] nivelInsercion;    // Calculado: profundidad + margen
    private boolean[] sangrado;      // 6 puntos
    private boolean[] placa;         // 6 puntos
    private ClaseFurca furca;
    private GradoMovilidad movilidad;
    private boolean ausente;
}
