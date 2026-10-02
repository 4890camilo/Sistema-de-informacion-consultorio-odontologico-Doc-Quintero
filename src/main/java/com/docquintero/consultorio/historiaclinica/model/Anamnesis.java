package com.docquintero.consultorio.historiaclinica.model;

import com.docquintero.consultorio.security.EncryptedField;
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
    
    @EncryptedField
    private String medicamentos;

    @EncryptedField
    private String alergias;
    
    // Enfermedades Sistémicas (diabetes, hipertensión, etc.)
    private List<String> enfermedadesSistemicas;
    
    // Hábitos (tabaquismo, alcohol, bruxismo, etc.)
    private List<String> habitos;
    
    @EncryptedField
    private String antecedentesQuirurgicos;

    @EncryptedField
    private String antecedentesOdontologicos;
    
    private boolean embarazo;
    
    // Alertas Médicas Destacadas
    @EncryptedField
    private String alertasMedicas;
    
    private String comentarios;
    
    // Auditoría
    private String usuarioUltimaModificacion;
    private LocalDateTime fechaUltimaModificacion;
}
