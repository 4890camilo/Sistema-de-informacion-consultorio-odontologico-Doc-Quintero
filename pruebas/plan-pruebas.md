# Plan de Pruebas del Sistema
## Consultorio Odontológico Doc Quintero

### 1. Alcance
Validar el correcto funcionamiento de los módulos de Autenticación, Gestión de Pacientes, Agendamiento de Citas, Historia Clínica Electrónica y Reportes, garantizando los atributos de calidad definidos en la tesis (Seguridad, Disponibilidad, Mantenibilidad y Rendimiento).

---

### 2. Tipos de Pruebas Contemplados
1. **Pruebas Unitarias:** Ejecutadas sobre las capas de servicio y controladores usando JUnit 5 y Mockito, con medición de cobertura mediante JaCoCo.
2. **Pruebas de Integración:** Verificación de flujos end-to-end de autenticación JWT y persistencia en MongoDB.
3. **Pruebas de Seguridad:** Validación de políticas de contraseñas BCrypt, tokens JWT y encriptación de datos clínicos.
4. **Pruebas de Rendimiento:** Verificación de tiempos de respuesta en consultas de agenda e historias clínicas (< 2 segundos).
5. **Pruebas de Aceptación:** Validación operativa con el odontólogo y la auxiliar administrativa.

---

### 3. Matriz de Trazabilidad (Historias de Usuario vs. Pruebas)

| Historia de Usuario | Módulo | Tipo de Prueba | Criterio de Aceptación | Estado |
|---|---|---|---|---|
| **HU-001** | Autenticación | Unitaria / Seguridad | Generación de token JWT válido con credenciales correctas | Superada |
| **HU-002** | Autenticación | Seguridad | Denegación de acceso ante tokens inválidos o expirados | Superada |
| **HU-003** | Pacientes | Unitaria / Integración | Registro exitoso de paciente con validación de cédula única | Superada |
| **HU-004** | Pacientes | Unitaria | Búsqueda por cédula o nombre en tiempo < 2s | Superada |
| **HU-005** | Citas | Unitaria / Integración | Consulta de disponibilidad horaria sin solapamiento | Superada |
| **HU-006** | Citas | Unitaria | Programación de cita ligada al paciente y odontólogo | Superada |
| **HU-007** | Citas | Unitaria | Cambio de estado de cita (Reprogramada, Cancelada) | Superada |
| **HU-008** | Citas | Unitaria | Consulta del histórico de citas por paciente | Superada |
| **HU-009** | Historia Clínica | Unitaria / Seguridad | Registro de anamnesis con campos clínicos protegidos | Superada |
| **HU-010** | Historia Clínica | Unitaria / Rendimiento | Recuperación de historia clínica completa por paciente | Superada |
| **HU-012** | Reportes | Unitaria | Consolidación métrica de citas y pacientes atendidos | Superada |
