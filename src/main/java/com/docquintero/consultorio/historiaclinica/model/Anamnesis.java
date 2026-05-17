package com.docquintero.consultorio.historiaclinica.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Anamnesis {
    private String motivoConsulta;
    
    // Tratamiento Médico
    private boolean enTratamientoMedico;
    private String detalleTratamiento;
    
    private String medicamentos;
    private String alergias;
    
    // Enfermedades Sistémicas (diabetes, hipertensión, etc.)
    private List<String> enfermedadesSistemicas;
    
    // Hábitos (tabaquismo, alcohol, bruxismo, etc.)
    private List<String> habitos;
    
    private String antecedentesQuirurgicos;
    private String antecedentesOdontologicos;
    
    private boolean embarazo;
    
    // Alertas Médicas Destacadas
    private String alertasMedicas;
    
    private String comentarios;
    
    // Auditoría
    private String usuarioUltimaModificacion;
    private LocalDateTime fechaUltimaModificacion;
}
