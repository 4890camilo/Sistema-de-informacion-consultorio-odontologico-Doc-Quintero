# Historias de Usuario (HU-001 a HU-014)
## Consultorio Odontológico Doc Quintero

---

### HU-001: Iniciar sesión con credenciales válidas
- **Rol:** Como usuario del sistema (Administrador, Odontólogo, Recepcionista).
- **Acción:** Deseo ingresar mis credenciales de acceso (email y contraseña).
- **Resultado:** Para acceder a las funciones permitidas según mi rol asignado mediante autenticación JWT.
- **Criterios de Aceptación:**
  - Si las credenciales coinciden con un registro activo en la base de datos, el sistema genera un token JWT firmado y redirige a la vista correspondiente.
  - Las contraseñas deben compararse usando BCrypt.

### HU-002: Cerrar la sesión
- **Rol:** Como usuario autenticado.
- **Acción:** Deseo presionar el botón de cerrar sesión.
- **Resultado:** Para invalidar y eliminar el token del cliente garantizando la seguridad del terminal de trabajo.

### HU-003: Registrar un paciente
- **Rol:** Como Recepcionista / Odontólogo.
- **Acción:** Deseo ingresar los datos personales y de contacto de un paciente.
- **Resultado:** Para crear su expediente digital en el consultorio.
- **Criterios de Aceptación:**
  - Número de identificación obligatorio y único (sin duplicados).
  - Nombres, apellidos y teléfono requeridos.

### HU-004: Buscar y actualizar datos de un paciente
- **Rol:** Como Recepcionista / Odontólogo.
- **Acción:** Deseo buscar por número de documento o nombres y modificar datos de contacto.
- **Resultado:** Para mantener la información actualizada.

### HU-005: Consultar disponibilidad del odontólogo
- **Rol:** Como Recepcionista.
- **Acción:** Deseo ver en la agenda semanal los bloques ocupados y libres.
- **Resultado:** Para ofrecer citas sin solapamiento de horarios.

### HU-006: Programar una cita para un paciente registrado
- **Rol:** Como Recepcionista.
- **Acción:** Deseo agendar una cita seleccionando paciente, fecha, hora, duración y especialidad.
- **Resultado:** Para reservar el cupo de atención.
- **Criterios de Aceptación:**
  - Validación en tiempo real de no conflicto de horario para el odontólogo.

### HU-007: Reprogramar o cancelar una cita
- **Rol:** Como Recepcionista.
- **Acción:** Deseo cambiar la fecha/hora o pasar la cita a estado Cancelada/Anulada.
- **Resultado:** Para liberar el espacio de agenda ante imprevistos del paciente.

### HU-008: Consultar las citas de un paciente
- **Rol:** Como Odontólogo / Recepcionista.
- **Acción:** Deseo consultar el histórico cronológico de citas de un paciente.
- **Resultado:** Para verificar asistencias e inasistencias pasadas.

### HU-009: Crear la historia clínica de un paciente
- **Rol:** Como Odontólogo.
- **Acción:** Deseo abrir la ficha de historia clínica y registrar antecedentes personales, familiares y motivos de consulta.
- **Resultado:** Para dar inicio a la atención clínica documentada.
- **Criterios de Aceptación:**
  - Cada paciente solo puede tener una única historia clínica.
  - Campos sensibles cifrados en el nivel de datos.

### HU-010: Consultar la historia clínica de un paciente
- **Rol:** Como Odontólogo.
- **Acción:** Deseo visualizar antecedentes, alergias y evoluciones anteriores.
- **Resultado:** Para tomar decisiones diagnósticas informadas.

### HU-011: Registrar una evolución clínica
- **Rol:** Como Odontólogo.
- **Acción:** Deseo agregar una nota de evolución con fecha, tratamiento realizado y observaciones.
- **Resultado:** Para mantener el registro secuencial del tratamiento.

### HU-012: Consultar un reporte de citas por periodo
- **Rol:** Como Administrador.
- **Acción:** Deseo filtrar citas por rango de fechas y estado (atendidas, canceladas).
- **Resultado:** Para evaluar el desempeño operativo del consultorio.

### HU-013: Registrar y actualizar cuentas del personal
- **Rol:** Como Administrador.
- **Acción:** Deseo crear cuentas para nuevos empleados y actualizar sus correos o nombres.
- **Resultado:** Para gestionar el acceso del personal.

### HU-014: Asignar un rol y activar o desactivar una cuenta
- **Rol:** Como Administrador.
- **Acción:** Deseo cambiar el rol o suspender una cuenta de usuario.
- **Resultado:** Para restringir el acceso a usuarios inactivos.
