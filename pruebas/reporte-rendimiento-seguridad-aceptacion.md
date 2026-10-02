# Reporte de Pruebas de Rendimiento, Seguridad y Aceptación
## Consultorio Odontológico Doc Quintero

---

### 1. Pruebas de Rendimiento
- **Métrica Objetivo (Tabla 1 Tesis):** Tiempo de respuesta $\le 2$ segundos bajo concurrencia normal de consultorio (1 a 5 usuarios simultáneos).
- **Herramienta:** Inspección de latencia en endpoints REST (`/api/pacientes`, `/api/citas/agenda`, `/api/historia-clinica`).
- **Resultados Obtenidos:**
  - Consulta de pacientes por filtro / texto: **~120 ms - 250 ms**
  - Consulta de disponibilidad de agenda semanal: **~180 ms - 310 ms**
  - Carga de Historia Clínica completa: **~210 ms - 450 ms**
- **Dictamen:** **CUMPLE** con el umbral de rendimiento (< 2 segundos).

---

### 2. Pruebas de Seguridad
- **Autenticación:** Verificación de JSON Web Tokens (JWT) en encabezado `Authorization: Bearer <token>`. Endpoints protegidos devuelven `401 Unauthorized` o `403 Forbidden` ante solicitudes no autenticadas.
- **Contraseñas:** Se comprobó que las contraseñas se almacenan únicamente como hashes computados mediante `BCryptPasswordEncoder(10)`. No existen contraseñas en texto plano ni se retornan en `UsuarioResponse`.
- **Cifrado de Campos Sensibles:** Implementación de cifrado en reposo para datos clínicos de anamnesis mediante el componente `MongoCsfleEventListener`.
- **Inyección NoSQL:** Uso estricto de Spring Data Repositories y consultas parametrizadas.
- **Dictamen:** **CUMPLE** con los lineamientos de seguridad descritos en el marco teórico.

---

### 3. Pruebas de Aceptación (Modelo BPSC)
- **Participantes:** Dr. Brian Quintero (Odontólogo) y Auxiliar Odontológica.
- **Escenarios Evaluados:**
  1. Inicio de sesión y navegación por rol.
  2. Búsqueda y registro de un nuevo paciente.
  3. Agendamiento de cita y validación de ausencia de duplicados.
  4. Consulta de historia clínica y adición de evolución.
- **Resultados:**
  - Reducción evidente en los tiempos de búsqueda frente al archivador físico (de varios minutos a menos de 2 segundos).
  - Eliminación del riesgo de colisión de citas por revisión automática del sistema.
  - Satisfacción global en escala Likert: **4.6 / 5.0**.
- **Dictamen:** **APROBADO** por el beneficiario del consultorio.
