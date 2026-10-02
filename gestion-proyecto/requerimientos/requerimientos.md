# Matriz de Requerimientos del Sistema (RF y RNF)
## Consultorio Odontológico Doc Quintero

---

### Requerimientos Funcionales (RF-001 a RF-018)

| ID | Módulo | Descripción | Prioridad | Historia Relacionada |
|---|---|---|---|---|
| **RF-001** | Autenticación | El sistema debe autenticar a los usuarios mediante credenciales válidas y emitir un JWT. | Alta | HU-001 |
| **RF-002** | Autenticación | El sistema debe permitir el cierre de sesión invalidando el contexto local. | Media | HU-002 |
| **RF-003** | Pacientes | El sistema debe permitir registrar pacientes con datos demográficos completos y validación de cédula única. | Alta | HU-003 |
| **RF-004** | Pacientes | El sistema debe permitir la búsqueda rápida de pacientes por cédula o nombre. | Alta | HU-004 |
| **RF-005** | Pacientes | El sistema debe permitir la actualización de la información básica y de contacto del paciente. | Media | HU-004 |
| **RF-006** | Citas | El sistema debe consultar y desplegar la disponibilidad de bloques horarios del odontólogo. | Alta | HU-005 |
| **RF-007** | Citas | El sistema debe permitir la programación de citas validando ausencia de solapamientos. | Alta | HU-006 |
| **RF-008** | Citas | El sistema debe permitir reprogramar y cancelar citas actualizando el estado de la agenda. | Media | HU-007 |
| **RF-009** | Citas | El sistema debe listar el historial de citas asociadas a un paciente con sus respectivos estados. | Media | HU-008 |
| **RF-010** | Historia Clínica | El sistema debe permitir la creación de la historia clínica digital (anamnesis inicial). | Alta | HU-009 |
| **RF-011** | Historia Clínica | El sistema debe permitir la consulta de antecedentes y registros clínicos del paciente. | Alta | HU-010 |
| **RF-012** | Historia Clínica | El sistema debe registrar notas de evolución cronológicas con odontólogo responsable. | Alta | HU-011 |
| **RF-013** | Reportes | El sistema debe consolidar reportes de citas por periodo y cálculo de estados operativos. | Media | HU-012 |
| **RF-014** | Usuarios | El sistema debe permitir el registro de personal con sus datos básicos. | Alta | HU-013 |
| **RF-015** | Usuarios | El sistema debe permitir la edición de datos de cuentas existentes. | Media | HU-013 |
| **RF-016** | Usuarios | El sistema debe permitir asignar perfiles y roles de acceso. | Alta | HU-014 |
| **RF-017** | Usuarios | El sistema debe restringir operaciones administrativas únicamente al rol administrador. | Alta | HU-014 |
| **RF-018** | Usuarios | El sistema debe permitir activar o suspender el acceso de una cuenta de usuario. | Media | HU-014 |

---

### Requerimientos No Funcionales (RNF-001 a RNF-013)

| ID | Categoría | Descripción | Criterio de Verificación |
|---|---|---|---|
| **RNF-001** | Seguridad | Cifrado de contraseñas mediante algoritmo BCrypt. | Factor de costo $\ge 10$. |
| **RNF-002** | Seguridad | Autenticación y autorización basada en tokens JWT. | Cabecera `Bearer` requerida en endpoints seguros. |
| **RNF-003** | Seguridad | Cifrado en reposo para datos de salud sensibles (CSFLE). | Anamnesis cifrada en MongoDB. |
| **RNF-004** | Rendimiento | Tiempo de respuesta en consultas de agenda y pacientes $\le 2$ segundos. | Mediciones de latencia en red local. |
| **RNF-005** | Disponibilidad | Operación continua en horario de atención (lunes a sábado de 7:00 a 19:00). | $\ge 99\%$ de disponibilidad. |
| **RNF-006** | Mantenibilidad | Arquitectura de 3 capas desacopladas (`Controller -> Service -> Repository -> Model`). | Estructura de paquetes limpia. |
| **RNF-007** | Mantenibilidad | Cobertura de pruebas unitarias sobre capa de servicio $\ge 70\%$. | Informe automatizado JaCoCo. |
| **RNF-008** | Mantenibilidad | Código libre de errores tipo *Blocker* o *Critical* en análisis estático. | SonarQube Community Edition. |
| **RNF-009** | Usabilidad | Mensajes en español claros y entendibles sin tecnicismos. | Evaluación Likert $\ge 4.0/5.0$. |
| **RNF-010** | Portabilidad | Ejecución local en servidor on-premise sin dependencia obligatoria de conexión externa. | Red local del consultorio. |
| **RNF-011** | Normatividad | Cumplimiento de la Resolución 1995 de 1999 (Historia Clínica única, cronológica e inalterable). | Registro secuencial y trazable. |
| **RNF-012** | Normatividad | Cumplimiento de Ley 1581 de 2012 de Protección de Datos Personales en Colombia. | Acceso restringido y no exposición de contraseñas. |
| **RNF-013** | Integridad | Prevención de duplicidad de historias clínicas y solapamiento de citas. | Índices únicos en MongoDB y validaciones en capa de servicio. |
