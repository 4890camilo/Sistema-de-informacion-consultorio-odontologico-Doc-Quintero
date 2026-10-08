# Manual de Usuario
## Sistema de Información - Consultorio Odontológico Doc Quintero

Este documento es una guía paso a paso diseñada para capacitar al personal del Consultorio Odontológico Doc Quintero en el uso del sistema de información. 

El sistema está diseñado para modernizar y agilizar los procesos operativos, de agendamiento y clínicos del consultorio.

---

## 1. Acceso al Sistema (Login)

Para ingresar al sistema, siga estos pasos:
1. Abra su navegador web preferido (Google Chrome, Mozilla Firefox, Edge o Safari).
2. Ingrese la URL del sistema proporcionada por la administración.
3. En la pantalla de bienvenida, visualizará el formulario de inicio de sesión.
4. Ingrese su **Correo Electrónico** (o Usuario) y su **Contraseña**.
5. Haga clic en el botón **"Ingresar"**.
> **Nota:** Si olvidó su contraseña o es su primer ingreso, póngase en contacto con el Administrador del sistema para que restablezca o le asigne sus credenciales.

---

## 2. Navegación General (Dashboard)

Una vez haya iniciado sesión, será redirigido al **Dashboard Principal**. La información y las opciones del menú lateral dependerán del **Rol** que tenga asignado.

El sistema cuenta con 3 roles de usuario, con niveles de acceso diferentes:
* **Administrador**: Control total sobre el sistema, usuarios y métricas.
* **Recepcionista / Auxiliar**: Enfocado en la atención al cliente, agendamiento y creación de expedientes.
* **Odontólogo**: Enfocado en la visualización de su agenda médica y el diligenciamiento de historias clínicas.

---

## 3. Instrucciones por Rol

### 3.1. Administrador
El perfil de Administrador se encarga de la parametrización y control de acceso.

* **Gestión de Usuarios (Personal):**
  1. Diríjase al menú lateral y seleccione **"Configuración" > "Usuarios"**.
  2. Para registrar un nuevo empleado, haga clic en **"Nuevo Usuario"**.
  3. Llene los datos personales y, en la sección de seguridad, asígnele un rol (`ROLE_ADMIN`, `ROLE_ODONTOLOGO` o `ROLE_RECEPCIONISTA`).
  4. Para dar de baja a un empleado, utilice la opción "Desactivar" junto a su nombre. **No se eliminan registros** por motivos de auditoría.
* **Reportes y Analíticas:**
  1. Vaya a **"Reportes"**.
  2. Puede filtrar por fechas para ver: Número de pacientes nuevos, volumen de citas atendidas vs canceladas, y eficiencia en los tiempos de atención.

### 3.2. Recepcionista / Auxiliar Odontológica
Es el primer contacto con el paciente. Su responsabilidad radica en la agenda y datos demográficos.

* **Registro y Búsqueda de Pacientes:**
  1. Diríjase a la pestaña **"Pacientes"**.
  2. Utilice la barra superior para buscar si el paciente ya existe (buscando por número de Cédula o Apellidos).
  3. Si es paciente nuevo, haga clic en **"Añadir Paciente"** y complete: Cédula, Nombres, Apellidos, Teléfono de contacto, EPS y Contacto de Emergencia.
* **Agendamiento de Citas:**
  1. Vaya al módulo **"Agenda"** o **"Citas"**.
  2. Visualizará un calendario. Seleccione el día y haga clic en un bloque de hora disponible.
  3. En la ventana emergente, seleccione el **Paciente**, asigne el **Odontólogo** y detalle el **Motivo de la consulta**.
  4. Para cancelar o reprogramar, haga clic sobre la cita ya creada y seleccione la opción correspondiente.

### 3.3. Odontólogo
El usuario odontólogo gestiona la atención clínica directa al paciente.

* **Revisión de Agenda Diaria:**
  1. Al iniciar sesión, el odontólogo verá directamente las citas que tiene asignadas para *el día de hoy*.
* **Historia Clínica y Evoluciones:**
  1. Haga clic en el nombre del paciente en su agenda o búsquelo en el módulo **"Historias Clínicas"**.
  2. **Anamnesis inicial:** Revise los antecedentes médicos y alergias registradas antes de comenzar.
  3. **Nueva Evolución:** Registre en la nota de evolución los procedimientos realizados en la sesión, los diagnósticos y los insumos utilizados.
  4. **Odontograma (Si aplica):** Actualice el estado de las piezas dentales mediante la interfaz gráfica del odontograma.
  5. Guarde la sesión. El sistema añadirá automáticamente la fecha, la hora y su firma digital al registro.

---

## 4. Buenas Prácticas y Seguridad

* **Cierre de sesión:** Siempre que termine su turno o se aleje de la recepción/consultorio, haga clic en su perfil (esquina superior derecha) y presione **"Cerrar Sesión"**.
* **Contraseñas Seguras:** No comparta su contraseña con otros compañeros. Cada acción en el sistema (como borrar una cita o modificar una historia clínica) queda registrada a nombre de quien inició la sesión.
* **Consentimientos Informados:** Asegúrese de que la recepcionista haya cargado los documentos firmados por el paciente en la pestaña "Documentos" del expediente antes de realizar procedimientos invasivos.
