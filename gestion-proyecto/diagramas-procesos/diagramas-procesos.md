# Diagramas de Proceso (BPMN 2.0 AS-IS y TO-BE)
## Consultorio Odontológico Doc Quintero

En esta sección se sintetiza la evolución de los procesos de negocio descritos y modelados en la tesis de grado:

---

### 1. Proceso de Agendamiento de Citas

#### Estado Actual (AS-IS) - Proceso Manual
```mermaid
graph TD
    A([Paciente solicita cita verbal/teléfono]) --> B[Recepcionista busca en agenda física]
    B --> C{¿Horario disponible?}
    C -- No --> D[Informar al paciente / Ofrecer otra fecha]
    D --> E([Fin])
    C -- Sí --> F[Anotar manualmente en cuaderno/agenda]
    F --> G[Confirmar cita verbalmente]
    G --> H([Cita Agendada en Papel])
    
    style B fill:#ffebee,stroke:#c62828
    style F fill:#ffebee,stroke:#c62828
```
*Puntos de falla identificados:* Doble agendamiento por error visual, falta de trazabilidad, pérdida física de la agenda, ausencia de recordatorios automáticos.

#### Estado Futuro (TO-BE) - Sistematizado
```mermaid
graph TD
    A([Paciente solicita cita]) --> B[Recepcionista busca o registra paciente en el sistema]
    B --> C[Consultar calendario con disponibilidad en tiempo real]
    C --> D[Seleccionar fecha, bloque horario y tipo de cita]
    D --> E{¿Sistema valida disponibilidad?}
    E -- No --> F[Sistema alerta conflicto de horario]
    F --> C
    E -- Sí --> G[Sistema registra cita y actualiza agenda automáticamente]
    G --> H([Cita Programada y Notificada])
    
    style C fill:#e8f5e9,stroke:#2e7d32
    style E fill:#e8f5e9,stroke:#2e7d32
    style G fill:#e8f5e9,stroke:#2e7d32
```

---

### 2. Proceso de Gestión de Historia Clínica

#### Estado Actual (AS-IS) - Búsqueda Manual
```mermaid
graph TD
    A([Paciente llega al consultorio]) --> B[Recepcionista busca carpeta física en archivador]
    B --> C{¿Carpeta encontrada?}
    C -- No --> D[Crear nueva carpeta física / posible duplicado]
    C -- Sí --> E[Entregar carpeta al odontólogo]
    D --> E
    E --> F[Odontólogo registra evolución manuscrita]
    F --> G[Devolver carpeta a recepcionista para archivar]
    G --> H([Fin])
    
    style B fill:#ffebee,stroke:#c62828
    style D fill:#ffebee,stroke:#c62828
```
*Puntos de falla identificados:* Latencia prolongada en búsqueda física, deterioro del papel, mala caligrafía, riesgo de pérdida de información y violación de confidencialidad.

#### Estado Futuro (TO-BE) - Historia Clínica Electrónica
```mermaid
graph TD
    A([Paciente llega a consulta]) --> B[Odontólogo ingresa número de documento en el sistema]
    B --> C{¿Tiene Historia Clínica?}
    C -- No --> D[Crear formulario digital estructurado]
    C -- Sí --> E[Visualización inmediata < 2 segundos de antecedentes y evoluciones]
    D --> E
    E --> F[Registrar nueva evolución clínica con fecha y odontólogo responsable]
    F --> G[Sistema persiste registro de forma inalterable y cifrada]
    G --> H([Evolución Guardada y Auditada])
    
    style B fill:#e8f5e9,stroke:#2e7d32
    style E fill:#e8f5e9,stroke:#2e7d32
    style G fill:#e8f5e9,stroke:#2e7d32
```
