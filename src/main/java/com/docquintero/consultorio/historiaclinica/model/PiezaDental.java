package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PiezaDental {
    /** Número FDI de dos dígitos (11-48 permanente, 51-85 temporal) */
    private Integer numeroPieza;

    /** Condición general de la pieza dental */
    private CondicionDental condicion;

    /** Superficies afectadas: MESIAL, DISTAL, OCLUSAL, VESTIBULAR, PALATINO, LINGUAL */
    private List<String> superficiesAfectadas;

    /**
     * Estado por superficie específica.
     * Clave: nombre superficie (e.g. "MESIAL"), Valor: condición (e.g. CARIES).
     */
    private Map<String, CondicionDental> superficiesEstado;

    /** Código diagnóstico CIE-10 (e.g. "K02.1" = Caries de la dentina) */
    private String codigoCie10;

    /** Descripción legible del código CIE-10 */
    private String descripcionCie10;

    /** Código de procedimiento CUPS (e.g. "232101" = Resina de fotocurado) */
    private String codigoCups;

    /** Descripción legible del procedimiento CUPS */
    private String descripcionCups;

    /** Estado general de la pieza (PRESENTE, AUSENTE, SUPERNUMERARIO, etc.) */
    private EstadoPieza estado;

    /** Notas clínicas adicionales del odontólogo */
    private String notas;

    /** Si true, esta pieza fue anulada en esta versión del odontograma */
    private boolean anulada;
}
